import React from "react";
import { logoutAll } from "../requests";

const LogoutAll = ({
  setUserData,
  userData,
  setProjects,
  setHasFetchedProjectData
}) => {
  const handleLogoutAll = () =>
    logoutAll(userData, setUserData, setProjects, setHasFetchedProjectData);
  return (
    <div id="logout-all">
      <h2>Logout All</h2>
      <button onClick={handleLogoutAll} type="button">
        Logout All
      </button>
    </div>
  );
};

export default LogoutAll;
