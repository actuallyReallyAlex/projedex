import React from "react";
import PropTypes from "prop-types";
import { refreshData } from "../requests";
import { connect } from "react-redux";
import { setProjects, setUserData } from "../redux/actions/app";

const RefreshDataButton = ({
  handleSetProjects,
  handleSetUserData,
  userData
}) => {
  const handleDataRefresh = () => {
    refreshData(userData, handleSetUserData, handleSetProjects);
  };
  return (
    <button onClick={handleDataRefresh} type="button">
      Refresh Data
    </button>
  );
};

RefreshDataButton.propTypes = {
  handleSetProjects: PropTypes.func.isRequired,
  handleSetUserData: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ app }) => ({
  userData: app.userData
});

const mapDispatchToProps = dispatch => ({
  handleSetProjects: projects => dispatch(setProjects(projects)),
  handleSetUserData: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(RefreshDataButton);
