import { apiDomain } from "../../constants";
import { setUserData } from "./user";
import { setProjectData } from "./projects";
import request from "request";

// * ACTION TYPES
const SET_HAS_FETCHED_PROJECT_DATA = "SET_HAS_FETCHED_PROJECT_DATA";
const SET_SHOULD_HIT_SAVE_TOKEN = "SET_SHOULD_HIT_SAVE_TOKEN";
const SET_ERROR = "SET_ERROR";
const SET_LOADING = "SET_LOADING";
const SET_CONTENT = "SET_CONTENT";

// * ACTION GENERATORS
export const setHasFetchedProjectData = hasFetchedProjectData => ({
  type: SET_HAS_FETCHED_PROJECT_DATA,
  payload: { hasFetchedProjectData }
});

export const setShouldHitSaveToken = shouldHitSaveToken => ({
  type: SET_SHOULD_HIT_SAVE_TOKEN,
  payload: { shouldHitSaveToken }
});

export const setError = error => ({ type: SET_ERROR, payload: { error } });

export const setLoading = loading => ({
  type: SET_LOADING,
  payload: { loading }
});

export const setContent = content => ({
  type: SET_CONTENT,
  payload: { content }
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

/**
 * Get list of repos
 * @param {Function} setRepos Hook function for displaying repo data
 */
export const getRepos = setRepos => async (dispatch, getState) => {
  try {
    const { user } = await getState();
    const response = await makeRequest(`${apiDomain}/gh-import`, {
      json: true,
      method: "GET",
      auth: {
        bearer: user.userData.token
      }
    });

    if (response.statusCode === 200) {
      setRepos(response.body);
    } else {
      throw new Error({ error: "Response statusCode was not 200", response });
    }
  } catch (e) {
    return console.error(e);
  }
};

/**
 * Import GitHub repos as projects.
 * @param {Array} repos Repos to be imported. Ex. [{ id: 001 }, { id: 002 }]
 */
export const importRepos = repos => async (dispatch, getState) => {
  try {
    const { user } = await getState();
    const response = await makeRequest(`${apiDomain}/gh-import`, {
      json: true,
      method: "POST",
      auth: {
        bearer: user.userData.token
      },
      body: { repos }
    });

    if (response.statusCode === 201) {
      dispatch(setProjectData(response.body.projects));
    } else {
      throw new Error({ error: "Response statusCode was not 201", response });
    }
  } catch (e) {
    return console.error(e);
  }
};
