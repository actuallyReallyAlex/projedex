const mockGitHubAccount = {
  login: "mock-login",
  repos: [
    {
      owner: { login: "mock-login" },
      name: "Mock Repo 1"
    },
    {
      owner: { login: "mock-login" },
      name: "Mock Repo 2"
    }
  ]
};

module.exports = {
  mockGitHubAccount
};
