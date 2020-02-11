import request from "request";
import { apiDomain } from "./constants";

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
