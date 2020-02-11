import React from "react";
import PropTypes from "prop-types";
import { deleteProject } from "../requests";
import { connect } from "react-redux";
import { setProjectData } from "../redux/actions/projects";

const DeleteProjectButton = ({ handleSetProjects, id, projects, userData }) => {
  const handleDeleteProject = () =>
    deleteProject(id, userData, handleSetProjects, projects);
  return (
    <button onClick={handleDeleteProject} type="button">
      Delete Project
    </button>
  );
};

DeleteProjectButton.propTypes = {
  handleSetProjects: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ app, projects, user }) => ({
  projectData: projects.projectData,
  userData: user.userData
});

const mapDispatchToProps = dispatch => ({
  handleSetProjects: projectData => dispatch(setProjectData(projectData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteProjectButton);
