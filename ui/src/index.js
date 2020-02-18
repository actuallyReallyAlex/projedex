import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import "semantic-ui-css/semantic.min.css";
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://3e9e5a7f93194dca8e9e0ae5bee3923b@sentry.io/2639408",
  environment: process.env.NODE_ENV
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
