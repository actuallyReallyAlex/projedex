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
