import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import CreateUser from "./CreateUser";
import Logout from "./Logout";
import DeleteUser from "./DeleteUser";
import ModifyUser from "./ModifyUser";
import CreateProject from "./CreateProject";
import DataViewer from "./DataViewer";
import RefreshDataButton from "./RefreshDataButton";
import LogoutAll from "./LogoutAll";
import IntegrateWithGitHub from "./IntegrateWithGitHub";
import { connect } from "react-redux";

const Home = ({ userData }) => {
  return (
    <div className="App">
      <h1>Projedex (BASIC UI)</h1>
      {userData && <RefreshDataButton />}
      <DataViewer />
      <form>
        {!userData && (
          <Fragment>
            <CreateUser />
            <Login />
          </Fragment>
        )}
        {userData && (
          <Fragment>
            <Logout />
            <LogoutAll />
            <DeleteUser />
            <ModifyUser />
            <CreateProject />
            <IntegrateWithGitHub />
          </Fragment>
        )}
      </form>
    </div>
  );
};

Home.propTypes = {
  userData: PropTypes.object
};

const mapStateToProps = ({ app }) => ({
  userData: app.userData
});

export default connect(mapStateToProps, null)(Home);
