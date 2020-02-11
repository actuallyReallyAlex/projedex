// * ACTION TYPES
const SET_PROJECTS = "SET_PROJECTS";

// * ACTION GENERATORS
export const setProjects = projects => ({
  type: SET_PROJECTS,
  payload: { projects }
});

// * PROMISES

// * THUNKS
