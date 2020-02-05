import React, { useState } from "react";
import { modifyProject } from "../requests";

const ModifyProjectButton = ({ id, userData, setProjects, projects }) => {
  const [isModifying, setIsModifying] = useState(false);
  const [name, setName] = useState(null);

  const handleModifyProject = () => {
    document.getElementById(`modify-project-name-${id}`).value = "";
    setIsModifying(false);

    modifyProject(id, userData, name, setProjects, projects);
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

export default ModifyProjectButton;
