import React from "react";
import { integrateWithGitHub } from "../requests";

const IntegrateWithGitHub = ({ userData, setInnerHTML }) => {
  const handleIntegrateWithGitHub = () =>
    integrateWithGitHub(userData, setInnerHTML);
  return (
    <button onClick={handleIntegrateWithGitHub} type="button">
      Integrate With GitHub
    </button>
  );
};

export default IntegrateWithGitHub;
