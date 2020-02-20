import React, { useState } from "react";
import PropTypes from "prop-types";
import { modifyProject } from "../redux/actions/projects";
import { connect } from "react-redux";

const ModifyProjectButton = ({ handleModifyProject, id }) => {
  const [isModifying, setIsModifying] = useState(false);
  const [name, setName] = useState(null);

  const handleClickSubmitModification = () => {
    document.getElementById(`modify-project-name-${id}`).value = "";
    setIsModifying(false);

    handleModifyProject(id, { name });
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
          <button onClick={handleClickSubmitModification} type="button">
            Submit Modification
          </button>
        </div>
      )}
    </div>
  );
};

ModifyProjectButton.propTypes = {
  handleModifyProject: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleModifyProject: (id, modification) =>
    dispatch(modifyProject(id, modification))
});

export default connect(null, mapDispatchToProps)(ModifyProjectButton);
