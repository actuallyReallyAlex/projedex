import React from "react";
import PropTypes from "prop-types";
import { logout } from "../requests";
import { connect } from "react-redux";
import {
  setHasFetchedProjectData,
  setProjects,
  setUserData
} from "../redux/actions/app";

const Logout = ({
  handleSetHasFetchedProjectData,
  handleSetProjects,
  handleSetUserData,
  userData
}) => {
  const handleLogout = () =>
    logout(
      userData,
      handleSetUserData,
      handleSetProjects,
      handleSetHasFetchedProjectData
    );
  return (
    <div id="logout">
      <h2>Logout</h2>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </div>
  );
};

Logout.propTypes = {
  handleSetHasFetchedProjectData: PropTypes.func.isRequired,
  handleSetProjects: PropTypes.func.isRequired,
  handleSetUserData: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ app }) => ({ userData: app.userData });

const mapDispatchToProps = dispatch => ({
  handleSetHasFetchedProjectData: hasFetchedProjectData =>
    dispatch(setHasFetchedProjectData(hasFetchedProjectData)),
  handleSetProjects: projects => dispatch(setProjects(projects)),
  handleSetUserData: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
