import React, { useState, useEffect, Fragment } from "react";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import Logout from "./components/Logout";
import DeleteUser from "./components/DeleteUser";
import ModifyUser from "./components/ModifyUser";
import CreateProject from "./components/CreateProject";
import useLocalStorage from "./hooks/useLocalStorage";
import request from "request";
import { proxy } from "./constants";

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
    <div className="App">
      <h1>Projedex (BASIC UI)</h1>
      <pre>{JSON.stringify({ userData, projects }, null, 2)}</pre>
      <form>
        {!userData && (
          <Fragment>
            <CreateUser
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password}
              name={name}
              setUserData={setUserData}
            />
            <Login
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              setUserData={setUserData}
            />
          </Fragment>
        )}
        {userData && (
          <Logout
            setProjects={setProjects}
            setUserData={setUserData}
            userData={userData}
          />
        )}
        {userData && (
          <DeleteUser setUserData={setUserData} userData={userData} />
        )}
        {userData && (
          <ModifyUser setUserData={setUserData} userData={userData} />
        )}
        {userData && (
          <CreateProject
            setProjects={setProjects}
            projects={projects}
            userData={userData}
          />
        )}
      </form>
    </div>
  );
};

export default App;
