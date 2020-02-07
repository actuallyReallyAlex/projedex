import React, { useState } from "react";
import PropTypes from "prop-types";
import { modifyProject } from "../requests";
import { connect } from "react-redux";
import { setProjects } from "../redux/actions/app";

const ModifyProjectButton = ({ handleSetProjects, id, projects, userData }) => {
  const [isModifying, setIsModifying] = useState(false);
  const [name, setName] = useState(null);

  const handleModifyProject = () => {
    document.getElementById(`modify-project-name-${id}`).value = "";
    setIsModifying(false);

    modifyProject(id, userData, name, handleSetProjects, projects);
  };
  return (
    <div>
      <button onClick={() => setIsModifying(true)} type="button">
        Modify Project
      </button>
      {isModifying && (
        <div>
          <label>Name</label>
          <input
            id={`modify-project-name-${id}`}
            onChange={e => setName(e.target.value)}
            type="text"
          />
          <button onClick={handleModifyProject} type="button">
            Submit Modification
          </button>
        </div>
      )}
    </div>
  );
};

ModifyProjectButton.propTypes = {
  handleSetProjects: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ app }) => ({
  projects: app.projects,
  userData: app.userData
});

const mapDispatchToProps = dispatch => ({
  handleSetProjects: projects => dispatch(setProjects(projects))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifyProjectButton);
