import React from "react";
import PropTypes from "prop-types";
import { deleteProject } from "../requests";
import { connect } from "react-redux";
import { setProjects } from "../redux/actions/app";

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
)(DeleteProjectButton);
