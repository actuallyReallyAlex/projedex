// * ACTION TYPES
const SET_HAS_FETCHED_PROJECT_DATA = "SET_HAS_FETCHED_PROJECT_DATA";
const SET_SHOULD_HIT_SAVE_TOKEN = "SET_SHOULD_HIT_SAVE_TOKEN";

// * ACTION GENERATORS
export const setHasFetchedProjectData = hasFetchedProjectData => ({
  type: SET_HAS_FETCHED_PROJECT_DATA,
  payload: { hasFetchedProjectData }
});

export const setShouldHitSaveToken = shouldHitSaveToken => ({
  type: SET_SHOULD_HIT_SAVE_TOKEN,
  payload: { shouldHitSaveToken }
});

// * PROMISES

// * THUNKS
