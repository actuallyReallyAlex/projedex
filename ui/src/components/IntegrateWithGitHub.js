import React from "react";
import { integrateWithGitHub } from "../requests";

const IntegrateWithGitHub = ({ userData }) => {
  const handleIntegrateWithGitHub = () => integrateWithGitHub(userData);
  return (
    <button onClick={handleIntegrateWithGitHub} type="button">
      Integrate With GitHub
    </button>
  );
};

export default IntegrateWithGitHub;
