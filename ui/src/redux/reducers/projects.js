const projectsDefaultState = {
  projectData: []
};

export default (state = projectsDefaultState, action) => {
  switch (action.type) {
    case "SET_PROJECT_DATA":
      return { ...state, projectData: action.payload.projectData };
    default:
      return state;
  }
};
