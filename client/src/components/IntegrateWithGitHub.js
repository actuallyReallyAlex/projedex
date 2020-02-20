import React from "react";
import PropTypes from "prop-types";
import { integrateWithGitHub } from "../redux/actions/app";
import { connect } from "react-redux";

const IntegrateWithGitHub = ({ handleIntegrateWithGitHub }) => {
  return (
    <button onClick={handleIntegrateWithGitHub} type="button">
      Integrate With GitHub
    </button>
  );
};

IntegrateWithGitHub.propTypes = {
  handleIntegrateWithGitHub: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleIntegrateWithGitHub: () => dispatch(integrateWithGitHub())
});

export default connect(null, mapDispatchToProps)(IntegrateWithGitHub);
