import React, { useState } from "react";
import PropTypes from "prop-types";
import { createProject } from "../requests";
import { connect } from "react-redux";
import { setProjects } from "../redux/actions/app";

const CreateProject = ({ handleSetProjects, projects, userData }) => {
  const [name, setName] = useState(null);

  const handleCreateProject = () =>
    createProject(userData, name, handleSetProjects, projects);

  return (
    <div id="create-project">
      <h2>Create Project</h2>
      <div>
        <label>Project Name</label>
        <input
          id="create-project-name"
          onChange={e => setName(e.target.value)}
          type="text"
        />
        <button onClick={handleCreateProject} type="button">
          Create Project
        </button>
      </div>
    </div>
  );
};

CreateProject.propTypes = {
  handleSetProjects: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
