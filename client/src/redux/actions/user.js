import request from "request";
import { apiDomain } from "../../constants";
import { setProjectData } from "./projects";
import {
  setHasFetchedProjectData,
  setError,
  setLoading,
  refreshData
} from "./app";

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
    dispatch(setLoading(false));
  } catch (e) {
    // TODO - Handle dispatching errors
    dispatch(setLoading(false));
    return console.error(e);
  }
};

/**
 * Login User
 * @param {String} email Email
 * @param {String} password Password
 */
export const logIn = (email, password) => async dispatch => {
  try {
    const response = await makeRequest(`${apiDomain}/users/login`, {
      json: true,
      body: { email, password },
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    // * 1. Server error -> Code 400
    // * 2. No "Error", but unable to log in -> Code 200 + response.body = { error: "Unable to log in" }
    // * 3. Client Side Error -> Catch bloock
    // * 4. Success -> Code 200 + response.body = { user: {}, token: "" }
    if (response.statusCode === 400) {
      dispatch(setError({ state: true, message: "Error ..." }));
      dispatch(setLoading(false));
    } else if (response.statusCode === 200) {
      if (response.body.error) {
        dispatch(setError({ state: true, message: response.body.error }));
        dispatch(setLoading(false));
      } else {
        dispatch(setUserData(response.body));
        dispatch(refreshData());
        dispatch(setLoading(false));
      }
    }
  } catch (e) {
    dispatch(setError({ state: true, message: "Error ..." }));
    dispatch(setLoading(false));
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

/**
 * Logout User from All Accounts
 */
export const logoutAll = () => async (dispatch, getState) => {
  try {
    const { user } = await getState();
    await makeRequest(`${apiDomain}/users/logoutAll`, {
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
    dispatch(setLoading(false));
  } catch (e) {
    // TODO - Handle dispatching errors
    dispatch(setLoading(false));
    return console.error(e);
  }
};

/**
 * Modify user document
 * @param {Object} modification Modification object
 */
export const modifyUser = modification => async (dispatch, getState) => {
  try {
    const { user } = await getState();
    const request = await makeRequest(`${apiDomain}/users/me`, {
      json: true,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: modification,
      auth: {
        bearer: user.userData.token
      }
    });
    dispatch(setUserData({ ...user.userData, user: request.body }));
    dispatch(setLoading(false));
  } catch (e) {
    // TODO - Handle dispatching error here
    dispatch(setLoading(false));
    return console.error(e);
  }
};
