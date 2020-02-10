export const proxy = "https://cors-anywhere.herokuapp.com/";

export const apiDomain =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DOMAIN
    : proxy + process.env.REACT_APP_API_DOMAIN;
