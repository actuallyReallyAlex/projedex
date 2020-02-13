const appDefaultState = {
  hasFetchedProjectData: false,
  shouldHitSaveToken: true
};

export default (state = appDefaultState, action) => {
  switch (action.type) {
    case "SET_HAS_FETCHED_PROJECT_DATA":
      return {
        ...state,
        hasFetchedProjectData: action.payload.hasFetchedProjectData
      };
    case "SET_SHOULD_HIT_SAVE_TOKEN":
      return {
        ...state,
        shouldHitSaveToken: action.payload.shouldHitSaveToken
      };
    default:
      return state;
  }
};
