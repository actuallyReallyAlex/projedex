import React from "react";
import { refreshData } from "../requests";

const RefreshDataButton = ({ userData, setUserData, setProjects }) => {
  const handleDataRefresh = () => {
    refreshData(userData, setUserData, setProjects);
  };
  return (
    <button onClick={handleDataRefresh} type="button">
      Refresh Data
    </button>
  );
};

export default RefreshDataButton;
