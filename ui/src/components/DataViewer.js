import React from "react";
import DeleteProjectButton from "./DeleteProjectButton";

const DataViewer = ({ userData, projects, setProjects }) => {
  return (
    <div id="data-viewer">
      <pre>{JSON.stringify({ userData }, null, 2)}</pre>
      {projects.length > 0 && <h2>Projects:</h2>}
      {projects.map(({ _id, name }) => (
        <div key={_id}>
          <span>{name}</span>
          <DeleteProjectButton
            id={_id}
            userData={userData}
            setProjects={setProjects}
            projects={projects}
          />
        </div>
      ))}
    </div>
  );
};

export default DataViewer;
