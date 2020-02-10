const request = require("supertest");
const app = require("../src/app");
const Project = require("../src/models/project");
const {
  userOne,
  userTwo,
  projectOne,
  setupDatabase
} = require("./fixtures/db");

describe("Project Endpoints | Authorized", () => {
  beforeEach(setupDatabase);

  test("POST /projects | Should create a project", async () => {
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({ name: "Test Project" })
      .expect(201);
    expect(response.body.name).toBe("Test Project");
    const project = await Project.findById(response.body._id);
    expect(project.name).toBe("Test Project");
  });

  test("GET /projects | Should be able to read all projects on user account", async () => {
    const response = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
    expect(response.body.length).toBe(2);
  });

  test("GET /projects/:id | Should get project info on specific project", async () => {
    const response = await request(app)
      .get(`/projects/${projectOne._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
    const project = await Project.findById(projectOne._id);
    expect(response.body._id).toBe(project._id.toString());
  });

  test("PATCH /project/:id | Should be able to modify a project", async () => {
    const response = await request(app)
      .patch(`/projects/${projectOne._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({ name: "New Project Name" })
      .expect(200);
    const project = await Project.findById(projectOne._id);
    expect(response.body._id).toBe(project._id.toString());
    expect(project.name).toBe("New Project Name");
  });

  test("PATCH /project/:id | Should not be able to modify a project with an invalid operation", async () => {
    const response = await request(app)
      .patch(`/projects/${projectOne._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({ lol: "fail" })
      .expect(400);
    expect(response.body.error).toBe("Invalid operation.");
  });

  test("DELETE /projects/:id | Should be able to delete a project", async () => {
    const response = await request(app)
      .delete(`/projects/${projectOne._id}`)
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
    const project = await Project.findById(projectOne._id);
    expect(response.body._id).toBe(projectOne._id.toString());
    expect(project).toBeNull();
  });
});

describe("Project Endpoints | Unauthorized", () => {
  beforeEach(setupDatabase);

  test("POST /projects | Should not be able to create a project if not authorized", async () => {
    const response = await request(app)
      .post("/projects")
      .send({ name: "New Project Name" })
      .send()
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
  });

  test("GET /projects | Should not be able to read all projects on user account if not authorized", async () => {
    const response = await request(app)
      .get("/projects")
      .send()
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
  });

  test("GET /projects/:id | Should not be able to get project info on specific project if not authorized", async () => {
    const response = await request(app)
      .get(`/projects/${projectOne._id}`)
      .send()
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
  });

  test("GET /projects/:id | Should not be able to get project info on specific project of another user", async () => {
    await request(app)
      .get(`/projects/${projectOne._id}`)
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(404);
  });

  test("PATCH /project/:id | Should not be able to modify a project if not authorized", async () => {
    const response = await request(app)
      .patch(`/projects/${projectOne._id}`)
      .send({ name: "New Project Name" })
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
  });

  test("PATCH /project/:id | Should not be able to modify a project of another user", async () => {
    await request(app)
      .patch(`/projects/${projectOne._id}`)
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send({ name: "New Project Name" })
      .expect(404);
  });

  test("DELETE /projects/:id | Should not be able to delete a project if not authorized", async () => {
    const response = await request(app)
      .delete(`/projects/${projectOne._id}`)
      .send()
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
  });

  test("DELETE /projects/:id | Should not be able to delete a project of another user", async done => {
    await request(app)
      .delete(`/projects/${projectOne._id}`)
      .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
      .send({ name: "New Project Name" })
      .expect(404);
    done();
  });
});
