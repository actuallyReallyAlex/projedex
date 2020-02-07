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

const Home = ({
  email,
  name,
  password,
  projects,
  setEmail,
  setHasFetchedProjectData,
  setName,
  setPassword,
  setProjects,
  setUserData,
  userData
}) => {
  return (
    <div className="App">
      <h1>Projedex (BASIC UI)</h1>
      {userData && (
        <RefreshDataButton
          userData={userData}
          setUserData={setUserData}
          setProjects={setProjects}
        />
      )}
      <DataViewer
        userData={userData}
        projects={projects}
        setProjects={setProjects}
      />
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
          <Fragment>
            <Logout
              setProjects={setProjects}
              setUserData={setUserData}
              userData={userData}
              setHasFetchedProjectData={setHasFetchedProjectData}
            />
            <LogoutAll
              setProjects={setProjects}
              setUserData={setUserData}
              userData={userData}
              setHasFetchedProjectData={setHasFetchedProjectData}
            />
          </Fragment>
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
        {userData && <IntegrateWithGitHub userData={userData} />}
      </form>
    </div>
  );
};

Home.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  password: PropTypes.string,
  projects: PropTypes.array.isRequired,
  setEmail: PropTypes.func.isRequired,
  setHasFetchedProjectData: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setProjects: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  userData: PropTypes.object
};

export default Home;
