import React, { useState } from "react";
import request from "request";
import { proxy } from "../constants";

const CreateProject = ({ userData, projects, setProjects }) => {
  const [name, setName] = useState(null);

  const handleCreateProject = () => {
    request(
      proxy + "https://projedex.herokuapp.com/projects",
      {
        json: true,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: { name },
        auth: {
          bearer: userData.token
        }
      },
      (error, response, body) => {
        if (error) {
          document.getElementById("create-project-name").value = "";
          return console.error(error);
        }

        if (response.statusCode === 201) {
          document.getElementById("create-project-name").value = "";
          setProjects([...projects, body]);
        }
      }
    );
  };

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
