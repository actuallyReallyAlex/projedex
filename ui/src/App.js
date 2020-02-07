import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import request from "request";
import { proxy } from "./constants";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Redirect from "./components/Redirect";

const App = () => {
  const [userData, setUserData] = useLocalStorage("userData", null);
  const [projects, setProjects] = useLocalStorage("projects", []);
  const [hasFetchedProjectData, setHasFetchedProjectData] = useLocalStorage(
    "hasFetchedProjectData",
    false
  );

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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
            setHasFetchedProjectData(true);
            setProjects(body);
          }
        }
      );
    }
  }, [
    userData,
    projects,
    hasFetchedProjectData,
    setHasFetchedProjectData,
    setProjects
  ]);

  return (
    <Router>
      <Switch>
        <Route
          path="/gh"
          children={
            <Redirect
              setProjects={setProjects}
              setUserData={setUserData}
              userData={userData}
            />
          }
        />
        <Route
          path="/"
          children={
            <Home
              email={email}
              name={name}
              password={password}
              projects={projects}
              setEmail={setEmail}
              setHasFetchedProjectData={setHasFetchedProjectData}
              setName={setName}
              setPassword={setPassword}
              setProjects={setProjects}
              setUserData={setUserData}
            />
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
