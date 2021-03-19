import request from "supertest";

import app from "../../../app.js";
import users from "../mock-data/users.js";
import UserModel from "../../repo/models/userModel";
import connectDB from "../../../config/db.js";

connectDB(process.env.MONGO_TEST_URI);

const endpointUrl = "/api/users/";
const updateProfileEndPointUrl = `${endpointUrl}profile`;

describe(endpointUrl, () => {
  afterEach(async () => {
    await UserModel.collection
      .drop()
      .then(() => {
        console.log("Successfully dropped User table.");
      })
      .catch((error) => {
        let message;
        if (error.message == "ns not found")
          message = "User collection does not exist, so it cannot be dropped. ";
        else message = error.message;

        console.log(`Error dropping User collection - ${message}`);
      });
  });

  test(`GET ${endpointUrl}`, async () => {
    // Create 2 new users for this test
    const newUser = await request(app).post(endpointUrl).send(users[0]);
    const newUser2 = await request(app).post(endpointUrl).send(users[1]);

    // Update one newUser to isAdmin = {true} so we can send the request
    await request(app)
      .put(updateProfileEndPointUrl)
      .set("Authorization", "Bearer " + newUser.body.token)
      .send({ isAdmin: true });

    // Send request to protected/admin endpoint
    const response = await request(app)
      .get(endpointUrl)
      .set("Authorization", "Bearer " + newUser.body.token);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(2);
    expect(response.body[0].displayName).toBe(newUser.body.displayName);
    expect(response.body[1].displayName).toBe(newUser2.body.displayName);
  });

  test("GET " + endpointUrl + ":id", async () => {
    const newUser = await request(app).post(endpointUrl).send(users[0]);
    const newUser2 = await request(app).post(endpointUrl).send(users[1]);

    // Update one newUser to isAdmin = {true} so we can send the request
    await request(app)
      .put(updateProfileEndPointUrl)
      .set("Authorization", "Bearer " + newUser.body.token)
      .send({ isAdmin: true });

    const response = await request(app)
      .get(endpointUrl + newUser2.body._id)
      .set("Authorization", "Bearer " + newUser.body.token);

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toStrictEqual(newUser2.body._id);
  });

  test(`POST ${endpointUrl}`, async () => {
    const response = await request(app).post(endpointUrl).send(users[0]);

    expect(response.statusCode).toBe(201);
    expect(response.body.displayName).toBe(users[0].displayName);
    expect(response.body.email).toBe(users[0].email);
  });

  it(`should return 404 when non-existent user ID given with GET ${endpointUrl}:id`, async () => {
    const newUser = await request(app).post(endpointUrl).send(users[0]);

    // Update one newUser to isAdmin = {true} so we can send the request
    await request(app)
      .put(updateProfileEndPointUrl)
      .set("Authorization", "Bearer " + newUser.body.token)
      .send({ isAdmin: true });

    const response = await request(app)
      .get(endpointUrl + "6036907cec0ac70918837817")
      .set("Authorization", "Bearer " + newUser.body.token);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toStrictEqual("User not found");
  });

  it(`should return 500 on malformed data with POST ${endpointUrl}`, async () => {
    const response = await request(app).post(endpointUrl).send({
      displayName: "Missing password property",
      email: "liam@example.com",
    });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toStrictEqual(
      "UserRepo - Error while creating new database entry: User validation failed: password: Path `password` is required."
    );
  });
});
