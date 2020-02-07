import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Redirect from "./components/Redirect";
import request from "request";
import { proxy } from "./constants";
import { connect } from "react-redux";
import { setHasFetchedProjectData, setProjects } from "./redux/actions/app";

const App = ({
  handleSetHasFetchedProjectData,
  handleSetProjects,
  hasFetchedProjectData,
  projects,
  userData
}) => {
  useEffect(() => {
    // * Check if you should read projects
    if (userData && !hasFetchedProjectData) {
      request(
        proxy + "https://projedex.herokuapp.com/projects",
        {
          json: true,
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          auth: {
            bearer: userData.token
          }
        },
        (error, response, body) => {
          if (error) {
            return console.error(error);
          }

          if (response.statusCode === 200) {
            handleSetHasFetchedProjectData(true);
            handleSetProjects(body);
          }
        }
      );
    }
  }, [
    userData,
    projects,
    hasFetchedProjectData,
    handleSetHasFetchedProjectData,
    handleSetProjects
  ]);
  return (
    <Router>
      <Switch>
        <Route path="/gh" children={<Redirect />} />
        <Route path="/" children={<Home />} />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  handleSetHasFetchedProjectData: PropTypes.func.isRequired,
  handleSetProjects: PropTypes.func.isRequired,
  hasFetchedProjectData: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = ({ app }) => ({
  hasFetchedProjectData: app.hasFetchedProjectData,
  projects: app.projects,
  userData: app.userData
});

const mapDispatchToProps = dispatch => ({
  handleSetHasFetchedProjectData: hasFetchedProjectData =>
    dispatch(setHasFetchedProjectData(hasFetchedProjectData)),
  handleSetProjects: projects => dispatch(setProjects(projects))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
