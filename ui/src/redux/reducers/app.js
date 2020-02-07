const appDefaultState = {
  hasFetchedProjectData: false,
  projects: [],
  userData: null
};

export default (state = appDefaultState, action) => {
  switch (action.type) {
    case "SET_HAS_FETCHED_PROJECT_DATA":
      return {
        ...state,
        hasFetchedProjectData: action.payload.hasFetchedProjectData
      };
    case "SET_PROJECTS":
      return { ...state, projects: action.payload.projects };
    case "SET_USER_DATA":
      return { ...state, userData: action.payload.userData };
    default:
      return state;
  }
};
