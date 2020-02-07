const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const axios = require("axios");

// * ✅ 1. Hit /gh -> API sends back a URL (Step 1)
// * ☑️ 2. UI hits that URL (Step 1)
// * ☑️ 3. User authenticates on GitHub (Step 1)
// * ✅ 4. User is redirected to /gh-redirect?code=**** with a special code as a parameter (Step 2)
// * ✅ 5. API hits GitHub with that code and gets back an access token (Step 2)
// * ✅ 6. API saves that access token to the User profile (Step 3)

router.get("/gh", auth, async (req, res) => {
  // * ✅ 1. Hit /gh -> API sends back a URL (Step 1)
  // * ☑️ 2. UI hits that URL (Step 1)
  // * ☑️ 3. User authenticates on GitHub (Step 1)

  try {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI_START}&scope=repo`;
    res.send({ url });
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/gh-redirect", async (req, res) => {
  // * ✅ 4. User is redirected to /gh-redirect?code=**** with a special code as a parameter (Step 2)
  // * ✅ 5. API hits GitHub with that code and gets back an access token (Step 2)
  // * ✅ 6. API saves that access token to the User profile (Step 3)

  try {
    const { code } = req.query;
    let access_token = "mock-access-token";
    if (!process.env.MOCK_REDIRECTION) {
      // * Prod
      const gitHubResponse = await axios({
        method: "POST",
        url: `https://github.com/login/oauth/access_token?client_id=${process.env.OAUTH_CLIENT_ID}&client_secret=${process.env.OAUTH_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.OAUTH_REDIRECT_URI_FINAL}`,
        headers: { Accept: "application/json" }
      });
      access_token = gitHubResponse.body.access_token;
    }

    res.send({ accessToken: access_token });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
