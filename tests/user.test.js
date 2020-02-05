const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  setupDatabase
} = require("./fixtures/db");

describe("User Endpoints | Authorized", () => {
  beforeEach(setupDatabase);

  test("POST /users | Should signup a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Alex",
        email: "alex@alexlee.dev",
        password: "Red1234567890"
      })
      .expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
      user: {
        name: "Alex",
        email: "alex@alexlee.dev"
      },
      token: user.tokens[0].token
    });
    expect(user.password).not.toBe("Red1234567890");
  });

  test("POST /users/login | Should login user if user exists", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({ email: userOne.email, password: userOne.password })
      .expect(200);

    // * Token passed back should match token in database
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
  });

  test("GET /users/me | Should get profile data for user", async () => {
    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
    expect(response.body._id).toBe(userOneId.toString());
    expect(response.body.name).toBe(userOne.name);
    expect(response.body.email).toBe(userOne.email);
  });

  test("POST /users/logout | Should be able to log out user", async () => {
    await request(app)
      .post("/users/logout")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("POST /users/logoutAll | Should be able to log out user of all accounts", async () => {
    await request(app)
      .post("/users/logoutAll")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    const user = await User.findById(userOneId);
    expect(user.tokens.length).toBe(0);
  });

  test("DELETE /users/me | Should be able to delete user", async () => {
    await request(app)
      .delete("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
  });

  test("PATCH /users/me | Should modify a user profile", async () => {
    const newEmail = "newemail@example.com";
    const newName = "Jose";

    const emailResponse = await request(app)
      .patch("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        email: newEmail
      })
      .expect(200);
    expect(emailResponse.body._id).toBe(userOneId.toString());
    expect(emailResponse.body.name).toBe(userOne.name);
    expect(emailResponse.body.email).toBe(newEmail);
    const user = await User.findById(userOneId);
    expect(user.email).toBe(newEmail);

    const nameResponse = await request(app)
      .patch("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: newName
      })
      .expect(200);
    expect(nameResponse.body._id).toBe(userOneId.toString());
    expect(nameResponse.body.name).toBe(newName);
    expect(nameResponse.body.email).toBe(newEmail);
    const userAgain = await User.findById(userOneId);
    expect(userAgain.name).toBe(newName);

    const failResponse = await request(app)
      .patch("/users/me")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({
        location: "Los Angeles"
      })
      .expect(400);
    expect(failResponse.body.error).toBe("Invalid operation.");
  });
});

describe("User Endpoints | Unauthorized", () => {
  beforeEach(setupDatabase);

  test("POST /users | Should not be able to signup a user with the same email as another user", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "Mike",
        email: userOne.email,
        password: "Red1234567890"
      })
      .expect(400);
  });

  test("POST /users/login | Should not be able to login non existing user", async () => {
    await request(app)
      .post("/users/login")
      .send({ email: "lol@example.com", password: "Fail1234567890" })
      .expect(400);
  });

  test("GET /users/me | Should not be able to get profile data for user if not authenticated", async () => {
    await request(app)
      .get("/users/me")
      .send()
      .expect(401);
  });

  test("POST /users/logout | Should not be able to log out user if not authenticated", async () => {
    await request(app)
      .post("/users/logout")
      .send()
      .expect(401);
  });

  test("POST /users/logoutAll | Should not be able to log out user of all accounts if not authenticated", async () => {
    const response = await request(app)
      .post("/users/logoutAll")
      .send()
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
  });

  test("DELETE /users/me | Should not be able to delete a user if not authorized", async () => {
    const response = await request(app)
      .delete("/users/me")
      .send()
      .expect(401);

    expect(response.body.error).toBe("Please authenticate.");

    const user = await User.findById(userOneId);
    expect(user).not.toBeNull();
  });

  test("PATCH /users/me | Should not be able to modify a user profile if not authorized", async done => {
    const response = await request(app)
      .patch("/users/me")
      .send({
        email: "lol@example.com"
      })
      .expect(401);
    expect(response.body.error).toBe("Please authenticate.");
    done();
  });
});
