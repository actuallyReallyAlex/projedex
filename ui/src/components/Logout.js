import React from "react";
import { logout } from "../requests";

const Logout = ({ setUserData, userData, setProjects, setHasFetchedProjectData }) => {
  const handleLogout = () => logout(userData, setUserData, setProjects, setHasFetchedProjectData);
  return (
    <div id="logout">
      <h2>Logout</h2>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </div>
  );
};

export default Logout;
