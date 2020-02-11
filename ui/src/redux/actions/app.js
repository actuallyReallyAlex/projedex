import { apiDomain } from "../../constants";
import { setUserData } from "./user";
import { setProjectData } from "./projects";
import request from "request";

// * ACTION TYPES
const SET_HAS_FETCHED_PROJECT_DATA = "SET_HAS_FETCHED_PROJECT_DATA";
const SET_SHOULD_HIT_SAVE_TOKEN = "SET_SHOULD_HIT_SAVE_TOKEN";

// * ACTION GENERATORS
export const setHasFetchedProjectData = hasFetchedProjectData => ({
  type: SET_HAS_FETCHED_PROJECT_DATA,
  payload: { hasFetchedProjectData }
});

export const setShouldHitSaveToken = shouldHitSaveToken => ({
  type: SET_SHOULD_HIT_SAVE_TOKEN,
  payload: { shouldHitSaveToken }
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
 * Refresh Data on App with fresh data from Database
 * @param {Object} history History object from router
 */
export const refreshData = history => async (dispatch, getState) => {
  try {
    const { user } = await getState();

    debugger;
    const userResponse = await makeRequest(`${apiDomain}/users/me`, {
      json: true,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        bearer: user.userData.token
      }
    });
    const newUserData = userResponse.body;
    const projectsResponse = await makeRequest(`${apiDomain}/projects`, {
      json: true,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        bearer: user.userData.token
      }
    });
    const newProjects = projectsResponse.body;

    dispatch(setUserData({ ...user.userData, user: newUserData }));
    dispatch(setProjectData(newProjects));

    if (history) history.push("/");
  } catch (e) {
    return console.error(e);
  }
};

/**
 * Integrate with GitHub
 */
export const integrateWithGitHub = () => async (dispatch, getState) => {
  try {
    const { user } = await getState();
    const response = await makeRequest(`${apiDomain}/gh`, {
      json: true,
      method: "GET",
      auth: {
        bearer: user.userData.token
      }
    });
    window.location.assign(response.body.url);
  } catch (e) {
    return console.error(e);
  }
};

/**
 * Save accessToken to database
 * @param {Object} history History object from React Router
 * @param {String} accessToken Access token provided by GitHub
 */
export const saveAccessToken = (history, accessToken) => async (
  dispatch,
  getState
) => {
  try {
    const { user } = await getState();
    await makeRequest(`${apiDomain}/users/me`, {
      json: true,
      method: "PATCH",
      auth: {
        bearer: user.userData.token
      },
      body: {
        accessToken
      }
    });

    dispatch(refreshData(history));
    dispatch(setShouldHitSaveToken(false));
  } catch (e) {
    return console.error(e);
  }
};
