import request from "request";
import { apiDomain } from "./constants";

export const getRepos = (userData, handleSetRepos) => {
  request(
    `${apiDomain}/gh-import`,
    {
      json: true,
      method: "GET",
      auth: {
        bearer: userData.token
      }
    },
    (error, response, body) => {
      if (error) {
        return console.error(error);
      }

      if (response.statusCode === 200) {
        handleSetRepos(response.body);
      }
    }
  );
};

export const importRepos = (userData, repos, handleSetProjects) => {
  request(
    `${apiDomain}/gh-import`,
    {
      json: true,
      method: "POST",
      auth: {
        bearer: userData.token
      },
      body: { repos }
    },
    (error, response, body) => {
      if (error) {
        return console.error(error);
      }

      if (response.statusCode === 201) {
        handleSetProjects(response.body.projects);
      }
    }
  );
};
