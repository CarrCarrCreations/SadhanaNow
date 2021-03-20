import request from "supertest";

import app from "../../../app.js";
import users from "../mock-data/users.js";
import UserModel from "../../repo/models/userModel";
import connectDB from "../../../config/db.js";

connectDB(process.env.MONGO_TEST_URI);

const endpointUrl = "/api/users/";
const updateProfileEndPointUrl = `${endpointUrl}profile`;

let adminUser;

describe(endpointUrl, () => {
  beforeEach(async () => {
    adminUser = await request(app).post(endpointUrl).send(users[0]);

    await request(app)
      .put(updateProfileEndPointUrl)
      .set("Authorization", "Bearer " + adminUser.body.token)
      .send({ isAdmin: true });
  });
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
    const newUser = await request(app).post(endpointUrl).send(users[1]);

    // Send request to protected/admin endpoint using adminUser JWT Token
    const response = await request(app)
      .get(endpointUrl)
      .set("Authorization", "Bearer " + adminUser.body.token);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(2);
    expect(response.body[1].displayName).toBe(newUser.body.displayName);
  });

  test("GET " + endpointUrl + ":id", async () => {
    const newUser = await request(app).post(endpointUrl).send(users[2]);

    // Send request to protected/admin endpoint using adminUser JWT Token
    const response = await request(app)
      .get(endpointUrl + newUser.body._id)
      .set("Authorization", "Bearer " + adminUser.body.token);

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toStrictEqual(newUser.body._id);
  });

  test(`POST ${endpointUrl}`, async () => {
    const response = await request(app).post(endpointUrl).send(users[1]);

    expect(response.statusCode).toBe(201);
    expect(response.body.displayName).toBe(users[1].displayName);
    expect(response.body.email).toBe(users[1].email);
  });

  it(`should return 404 when non-existent user ID given with GET ${endpointUrl}:id`, async () => {
    // Send request to protected/admin endpoint using adminUser JWT Token
    const response = await request(app)
      .get(endpointUrl + "6036907cec0ac70918837817")
      .set("Authorization", "Bearer " + adminUser.body.token);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toStrictEqual("UserService: User not found.");
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
