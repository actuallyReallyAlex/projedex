const request = require("supertest");
const app = require("../src/app");
const { userOne, setupDatabase } = require("./fixtures/db");

describe("GitHub Endpoints | Authorized", () => {
  beforeEach(setupDatabase);

  test("GET /gh | Should send back the URL for OAuth Web Flow Step 1", async () => {
    const response = await request(app)
      .get("/gh")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .expect(200);
    expect(response.body.url).toBe(
      `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}&scope=repo`
    );
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
