import React from "react";
import PropTypes from "prop-types";
import { logoutAll } from "../requests";
import { connect } from "react-redux";
import { setHasFetchedProjectData } from "../redux/actions/app";
import { setProjectData } from "../redux/actions/projects";
import { setUserData } from "../redux/actions/user";

const LogoutAll = ({
  handleSetHasFetchedProjectData,
  handleSetProjects,
  handleSetUserData,
  userData
}) => {
  const handleLogoutAll = () =>
    logoutAll(
      userData,
      handleSetUserData,
      handleSetProjects,
      handleSetHasFetchedProjectData
    );
  return (
    <div id="logout-all">
      <h2>Logout All</h2>
      <button onClick={handleLogoutAll} type="button">
        Logout All
      </button>
    </div>
  );
};

LogoutAll.propTypes = {
  handleSetHasFetchedProjectData: PropTypes.func.isRequired,
  handleSetProjects: PropTypes.func.isRequired,
  handleSetUserData: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ app, projects, user }) => ({
  userData: user.userData
});

const mapDispatchToProps = dispatch => ({
  handleSetHasFetchedProjectData: hasFetchedProjectData =>
    dispatch(setHasFetchedProjectData(hasFetchedProjectData)),
  handleSetProjects: projectData => dispatch(setProjectData(projectData)),
  handleSetUserData: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutAll);
