const request = require("supertest");
const app = require("../src/app");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");
const Project = require("../src/models/project");

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
      `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}&scope=repo`
    );
  });

  test("GET /gh-redirect | Should get access token OAuth Web Flow Step 2", async () => {
    const response = await request(app)
      .get(`/gh-redirect?code=mock-code`)
      .expect(302);
    expect(response.header.location).toBe(
      `${process.env.UI_DOMAIN}/gh?accessToken=mock-access-token`
    );
  });

  test("GET /gh-import | Should get an array of GitHub repos associated with the user account", async () => {
    const response = await request(app)
      .get("/gh-import")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .expect(200);
    expect(response.body).toStrictEqual([
      { id: "mock-id-1", name: "mock-repo-1" }
    ]);
  });

  test("POST /gh-import | Should store the repos in the database as projects", async () => {
    const response = await request(app)
      .post("/gh-import")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({ repos: [{ id: "mock-id-1", name: "mock-name-1" }] })
      .expect(201);
    const projects = await Project.find({ owner: userOneId });
    const modifiedResponseProjects = response.body.projects.map(project => ({
      ...project,
      _id: "mock-id",
      owner: "mock-owner",
      createdAt: "mock-time",
      updatedAt: "mock-time"
    }));
    const modifiedProjects = projects.map(({ __v, name, description }) => ({
      _id: "mock-id",
      __v,
      name,
      owner: "mock-owner",
      description,
      createdAt: "mock-time",
      updatedAt: "mock-time"
    }));
    expect(modifiedResponseProjects).toStrictEqual(modifiedProjects);
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

  test("GET /gh-import | Should not be able to get an array of GitHub repos associated with the user account if not authorized", async () => {
    const response = await request(app)
      .get("/gh-import")
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
  });

  test("POST /gh-import | Should not be able to store the repos in the database as projects if not authorized", async done => {
    const response = await request(app)
      .post("/gh-import")
      .send({ repos: [{ id: "mock-id-1", name: "mock-name-1" }] })
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
    done();
  });
});
