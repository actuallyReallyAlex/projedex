// * ACTION TYPES
const SET_USER_DATA = "SET_USER_DATA";

// * ACTION GENERATORS
export const setUserData = userData => ({
  type: SET_USER_DATA,
  payload: { userData }
});

// * PROMISES

// * THUNKS
