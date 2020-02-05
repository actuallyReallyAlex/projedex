import React, { useState } from "react";
import { createProject } from "../requests";

const CreateProject = ({ userData, projects, setProjects }) => {
  const [name, setName] = useState(null);

  const handleCreateProject = () =>
    createProject(userData, name, setProjects, projects);

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

export default CreateProject;
