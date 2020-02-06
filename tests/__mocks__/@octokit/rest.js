const { mockGitHubAccount } = require("../../fixtures/githubAccount");

class fakeOctokit {
  request(path) {
    if (path === "/user") {
      return {
        data: {
          login: mockGitHubAccount.login,
          public_repos: mockGitHubAccount.repos.length
        }
      };
    }

    if (path === "/user/repos") {
      return {
        data: mockGitHubAccount.repos
      };
    }

    return new Error("Mock Octokit did not get a recognized path");
  }
}

module.exports = {
  Octokit: fakeOctokit
};
