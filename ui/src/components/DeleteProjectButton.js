import React from "react";
import { deleteProject } from "../requests";

const DeleteProjectButton = ({ id, userData, setProjects, projects }) => {
  const handleDeleteProject = () =>
    deleteProject(id, userData, setProjects, projects);
  return (
    <button onClick={handleDeleteProject} type="button">
      Delete Project
    </button>
  );
};

export default DeleteProjectButton;
