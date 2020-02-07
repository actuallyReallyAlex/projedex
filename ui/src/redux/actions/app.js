// * ACTION TYPES
const SET_HAS_FETCHED_PROJECT_DATA = "SET_HAS_FETCHED_PROJECT_DATA";
const SET_PROJECTS = "SET_PROJECTS";
const SET_USER_DATA = "SET_USER_DATA";

// * ACTION GENERATORS
export const setHasFetchedProjectData = hasFetchedProjectData => ({
  type: SET_HAS_FETCHED_PROJECT_DATA,
  payload: { hasFetchedProjectData }
});

export const setProjects = projects => ({
  type: SET_PROJECTS,
  payload: { projects }
});

export const setUserData = userData => ({
  type: SET_USER_DATA,
  payload: { userData }
});

// * PROMISES

// * THUNKS
