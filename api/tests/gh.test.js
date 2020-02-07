const request = require("supertest");
const app = require("../src/app");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");
const User = require("../src/models/user");

// * ✅ 1. Hit /gh -> API sends back a URL (Step 1)
// * ☑️ 2. UI hits that URL (Step 1)
// * ☑️ 3. User authenticates on GitHub (Step 1)
// * ✅ 4. User is redirected to /gh-redirect?code=**** with a special code as a parameter (Step 2)
// * ✅ 5. API hits GitHub with that code and gets back an access token (Step 2)
// * ✅ 6. API saves that access token to the User profile (Step 3)

describe("GitHub Endpoints | Authorized", () => {
  beforeEach(setupDatabase);

  test("GET /gh | Should send back the URL for OAuth Web Flow Step 1", async () => {
    const response = await request(app)
      .get("/gh")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .expect(200);
    expect(response.body.url).toBe(
      `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI_START}&scope=repo`
    );
  });

  test("GET /gh-redirect | Should get access token OAuth Web Flow Step 2", async () => {
    const response = await request(app)
      .get(`/gh-redirect?code=mock-code`)
      .expect(200);
    expect(response.body.accessToken).toBe("mock-access-token");
  });
});

describe("GitHub Endpoints | Unauthorized", () => {
  beforeEach(setupDatabase);

  test("GET /gh | Should not be able to get OAuth URL if not authorized", async () => {
    const response = await request(app)
      .get("/gh")
      .send()
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
  });
});
