import request from "request";
import { apiDomain } from "../../constants";
import { setProjectData } from "./projects";
import { setHasFetchedProjectData } from "./app";

// * ACTION TYPES
const SET_USER_DATA = "SET_USER_DATA";

// * ACTION GENERATORS
export const setUserData = userData => ({
  type: SET_USER_DATA,
  payload: { userData }
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
 * Create User
 * @param {String} email Email
 * @param {String} name Name
 * @param {String} password Password
 */
export const createUser = (email, name, password) => async dispatch => {
  try {
    const response = await makeRequest(`${apiDomain}/users`, {
      json: true,
      body: { email, password, name },
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    dispatch(setUserData(response.body));
  } catch (e) {
    return console.error(e);
  }
};

/**
 * Delete User
 */
export const deleteUser = () => async (dispatch, getState) => {
  try {
    const { user } = await getState();
    await makeRequest(`${apiDomain}/users/me`, {
      json: true,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        bearer: user.userData.token
      }
    });

    dispatch(setUserData(null));
  } catch (e) {
    return console.error(e);
  }
};

/**
 * Login User
 * @param {String} email Email
 * @param {String} password Password
 */
export const login = (email, password) => async dispatch => {
  try {
    const response = await makeRequest(`${apiDomain}/users/login`, {
      json: true,
      body: { email, password },
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    dispatch(setUserData(response.body));
  } catch (e) {
    return console.error(e);
  }
};

/**
 * Logout User
 */
export const logout = () => async (dispatch, getState) => {
  try {
    const { user } = await getState();
    await makeRequest(`${apiDomain}/users/logout`, {
      json: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        bearer: user.userData.token
      }
    });

    dispatch(setUserData(null));
    dispatch(setProjectData([]));
    dispatch(setHasFetchedProjectData(false));
  } catch (e) {
    return console.error(e);
  }
};
