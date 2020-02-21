const appDefaultState = {
  content: 'home',
  error: {
    message: null,
    state: false
  },
  hasFetchedProjectData: false,
  loading: false,
  shouldHitSaveToken: true
}

export default (state = appDefaultState, action) => {
  switch (action.type) {
    case 'SET_HAS_FETCHED_PROJECT_DATA':
      return {
        ...state,
        hasFetchedProjectData: action.payload.hasFetchedProjectData
      }
    case 'SET_SHOULD_HIT_SAVE_TOKEN':
      return {
        ...state,
        shouldHitSaveToken: action.payload.shouldHitSaveToken
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.error
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      }
    case 'SET_CONTENT':
      return {
        ...state,
        content: action.payload.content
      }
    default:
      return state
  }
}
