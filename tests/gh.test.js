const request = require("supertest");
const app = require("../src/app");
const { userOne, setupDatabase } = require("./fixtures/db");

describe("GitHub Endpoints | Authorized", () => {
  beforeEach(setupDatabase);

  test("GET /gh | Should be able to integrate with GitHub", async () => {
    await request(app)
      .get("/gh")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .expect(200);
  });
});

describe("GitHub Endpoints | Unauthorized", () => {
  beforeEach(setupDatabase);

  test("GET /gh | Should not be able to integrate with GitHub if not authorized", async () => {
    const response = await request(app)
      .get("/gh")
      .send()
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
  });
});
