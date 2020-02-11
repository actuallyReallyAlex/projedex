const projectsDefaultState = {
  projects: []
};

export default (state = projectsDefaultState, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload.projects };
    default:
      return state;
  }
};
