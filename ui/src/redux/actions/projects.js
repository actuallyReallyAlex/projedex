import request from "request";
import { apiDomain } from "../../constants";

// * ACTION TYPES
const SET_PROJECT_DATA = "SET_PROJECT_DATA";

// * ACTION GENERATORS
export const setProjectData = projectData => ({
  type: SET_PROJECT_DATA,
  payload: { projectData }
});

// * PROMISES
/**
 * Uses request to make a request to a URI.
 * @param {String} uri URI to hit
 * @param {Object} options Options object. Ex { json, method, headers, body, auth, etc....}
 * @returns {Promise}
 */
const makeRequest = (uri, options) =>
  new Promise((resolve, reject) => {
    request(uri, options, (error, response, boody) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });

// * THUNKS
/**
 * Create a Project.
 * @param {String} name Name of Project
 */
export const createProject = name => async (dispatch, getState) => {
  try {
    const appState = await getState();
    const { projects, user } = appState;

    const response = await makeRequest(`${apiDomain}/projects`, {
      json: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: { name },
      auth: {
        bearer: user.userData.token
      }
    });

    document.getElementById("create-project-name").value = "";
    dispatch(setProjectData([...projects.projectData, response.body]));
  } catch (e) {
    document.getElementById("create-project-name").value = "";
    return console.error(e);
  }
};

/**
 * Delete a project
 * @param {String} id ID of project
 */
export const deleteProject = id => async (dispatch, getState) => {
  try {
    const { projects, user } = await getState();
    await makeRequest(`${apiDomain}/projects/${id}`, {
      json: true,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        bearer: user.userData.token
      }
    });

    dispatch(
      setProjectData(projects.projectData.filter(project => project._id !== id))
    );
  } catch (e) {
    return console.error(e);
  }
};
