import request from "request";
import { apiDomain } from "./constants";

export const createProject = (userData, name, setProjects, projects) =>
  request(
    `${apiDomain}/projects`,
    {
      json: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: { name },
      auth: {
        bearer: userData.token
      }
    },
    (error, response, body) => {
      if (error) {
        document.getElementById("create-project-name").value = "";
        return console.error(error);
      }

      if (response.statusCode === 201) {
        document.getElementById("create-project-name").value = "";
        setProjects([...projects, body]);
      }
    }
  );

export const createUser = (email, password, name, setUserData) =>
  request(
    `${apiDomain}/users`,
    {
      json: true,
      body: { email, password, name },
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    },
    (error, response, body) => {
      if (error) {
        return console.error(error);
      }

      setUserData(body);
    }
  );

export const deleteUser = (userData, setUserData) =>
  request(
    `${apiDomain}/users/me`,
    {
      json: true,
      method: "DELETE",
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
        setUserData(null);
      }
    }
  );

export const login = (email, password, setUserData) =>
  request(
    `${apiDomain}/users/login`,
    {
      json: true,
      body: { email, password },
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    },
    (error, response, body) => {
      if (error) {
        return console.error(error);
      }

      setUserData(body);
    }
  );

export const logout = (
  userData,
  setUserData,
  setProjects,
  setHasFetchedProjectData
) =>
  request(
    `${apiDomain}/users/logout`,
    {
      json: true,
      method: "POST",
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
        setUserData(null);
        setProjects([]);
        setHasFetchedProjectData(false);
      }
    }
  );

export const logoutAll = (
  userData,
  setUserData,
  setProjects,
  setHasFetchedProjectData
) =>
  request(
    `${apiDomain}/users/logoutAll`,
    {
      json: true,
      method: "POST",
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
        setUserData(null);
        setProjects([]);
        setHasFetchedProjectData(false);
      }
    }
  );

export const modifyUser = (requestBody, userData, setUserData) =>
  request(
    `${apiDomain}/users/me`,
    {
      json: true,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: requestBody,
      auth: {
        bearer: userData.token
      }
    },
    (error, response, body) => {
      if (error) {
        document.getElementById("modify-user-email").value = "";
        document.getElementById("modify-user-name").value = "";
        document.getElementById("modify-user-password").value = "";
        return console.error(error);
      }

      if (response.statusCode === 200) {
        document.getElementById("modify-user-email").value = "";
        document.getElementById("modify-user-name").value = "";
        document.getElementById("modify-user-password").value = "";
        setUserData({ ...userData, user: body });
      }
    }
  );

export const deleteProject = (id, userData, setProjects, projects) =>
  request(
    `${apiDomain}/projects/${id}`,
    {
      json: true,
      method: "DELETE",
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
        setProjects(projects.filter(project => project._id !== body._id));
      }
    }
  );

export const modifyProject = (id, userData, name, setProjects, projects) =>
  request(
    `${apiDomain}/projects/${id}`,
    {
      json: true,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: { name },
      auth: {
        bearer: userData.token
      }
    },
    (error, response, body) => {
      if (error) {
        return console.error(error);
      }

      if (response.statusCode === 200) {
        const newProjectsArray = [...projects];
        const modifiedProjectIndex = newProjectsArray.findIndex(
          project => project._id === body._id
        );
        newProjectsArray[modifiedProjectIndex] = body;
        setProjects(newProjectsArray);
      }
    }
  );

export const refreshData = (userData, setUserData, setProjects, cb) => {
  let newUserData;
  let newProjects;

  request(
    `${apiDomain}/users/me`,
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
        newUserData = body;

        request(
          `${apiDomain}/projects`,
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
              newProjects = body;

              setUserData({ ...userData, user: newUserData });
              setProjects(newProjects);

              if (cb) cb();
            }
          }
        );
      }
    }
  );
};

export const integrateWithGitHub = userData =>
  request(
    `${apiDomain}/gh`,
    {
      json: true,
      method: "GET",
      auth: {
        bearer: userData.token
      }
    },
    (error, response, body) => {
      if (error) {
        return console.error(error);
      }

      if (response.statusCode === 200) {
        window.location.assign(response.body.url);
      }
    }
  );

export const saveAccessToken = (userData, accessToken, cb) =>
  request(
    `${apiDomain}/users/me`,
    {
      json: true,
      method: "PATCH",
      auth: {
        bearer: userData.token
      },
      body: {
        accessToken
      }
    },
    (error, response, body) => {
      if (error) {
        return console.error(error);
      }

      if (response.statusCode === 200) {
        cb();
      }
    }
  );
  