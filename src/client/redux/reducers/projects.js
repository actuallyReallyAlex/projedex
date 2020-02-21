const projectsDefaultState = {
  projectData: [],
  currentProjectId: ''
}

export default (state = projectsDefaultState, action) => {
  switch (action.type) {
    case 'SET_PROJECT_DATA':
      return { ...state, projectData: action.payload.projectData }
    case 'SET_CURRENT_PROJECT_ID':
      return { ...state, currentProjectId: action.payload.currentProjectId }
    default:
      return state
  }
}
