import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducer from "../reducers/app";
import projectsReducer from "../reducers/projects";
import userReducer from "../reducers/user";
import { loadState, saveState } from "../../util";
import throttle from "lodash/throttle";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  combineReducers({
    app: appReducer,
    projects: projectsReducer,
    user: userReducer
  }),
  persistedState,
  composeEnhancer(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState({
      app: store.getState().app,
      projects: store.getState().projects,
      user: store.getState().user
    });
  }, 1000)
);

export default store;
