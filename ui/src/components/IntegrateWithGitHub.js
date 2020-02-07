import React from "react";
import PropTypes from "prop-types";
import { integrateWithGitHub } from "../requests";
import { connect } from "react-redux";

const IntegrateWithGitHub = ({ userData }) => {
  const handleIntegrateWithGitHub = () => integrateWithGitHub(userData);
  return (
    <button onClick={handleIntegrateWithGitHub} type="button">
      Integrate With GitHub
    </button>
  );
};

IntegrateWithGitHub.propTypes = {
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ app }) => ({ userData: app.userData });

export default connect(mapStateToProps, null)(IntegrateWithGitHub);
