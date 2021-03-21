import request from "supertest";

import app from "../../../app.js";
import users from "../mongodb/mock-data/users.js";
import UserModel from "../../repo/models/userModel";
import { connect, closeDatabase } from "../mongodb/db-handler.js";

const endpointUrl = "/api/users/";
const updateProfileEndPointUrl = `${endpointUrl}profile`;
const idEndPointUrl = `${endpointUrl}:id`;

let adminUser;

// Connect to in-memory MongoDB database
beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe(endpointUrl, () => {
  beforeAll(async () => {
    adminUser = await request(app).post(endpointUrl).send(users[0]);

    await request(app)
      .put(updateProfileEndPointUrl)
      .set("Authorization", "Bearer " + adminUser.body.token)
      .send({ isAdmin: true });
  });
  afterAll(async () => {
    await UserModel.collection.drop().catch((error) => {
      let message;
      if (error.message == "ns not found")
        message = "User collection does not exist, so it cannot be dropped.";
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

  test(`POST ${endpointUrl}`, async () => {
    const response = await request(app).post(endpointUrl).send(users[3]);

    expect(response.statusCode).toBe(201);
    expect(response.body.displayName).toBe(users[3].displayName);
    expect(response.body.email).toBe(users[3].email);
  });

  it(`ERROR - POST ${endpointUrl} - should return 500 on malformed data`, async () => {
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

describe(updateProfileEndPointUrl, () => {});
describe(idEndPointUrl, () => {
  beforeAll(async () => {
    adminUser = await request(app).post(endpointUrl).send(users[0]);

    await request(app)
      .put(updateProfileEndPointUrl)
      .set("Authorization", "Bearer " + adminUser.body.token)
      .send({ isAdmin: true });
  });
  afterAll(async () => {
    await UserModel.collection.drop().catch((error) => {
      let message;
      if (error.message == "ns not found")
        message = "User collection does not exist, so it cannot be dropped.";
      else message = error.message;

      console.log(`Error dropping User collection - ${message}`);
    });
  });

  test(`GET ${idEndPointUrl}`, async () => {
    const newUser = await request(app).post(endpointUrl).send(users[1]);

    // Send request to protected/admin endpoint using adminUser JWT Token
    const response = await request(app)
      .get(endpointUrl + newUser.body._id)
      .set("Authorization", "Bearer " + adminUser.body.token);

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toStrictEqual(newUser.body._id);
  });

  test(`DELETE ${idEndPointUrl}`, async () => {
    const newUser = await request(app).post(endpointUrl).send(users[2]);

    // Send request to protected/admin endpoint using adminUser JWT Token
    const response = await request(app)
      .delete(endpointUrl + newUser.body._id)
      .set("Authorization", "Bearer " + adminUser.body.token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      message: "User successfully removed.",
    });
  });

  test(`PUT ${idEndPointUrl}`, async () => {
    const newUser = await request(app).post(endpointUrl).send(users[3]);

    expect(newUser.body.displayName).toStrictEqual(users[3].displayName);

    // Send request to protected/admin endpoint using adminUser JWT Token
    const response = await request(app)
      .put(endpointUrl + newUser.body._id)
      .set("Authorization", "Bearer " + adminUser.body.token)
      .send({
        displayName: "Jessica Yo",
      });

    const updatedUser = await request(app)
      .get(endpointUrl + newUser.body._id)
      .set("Authorization", "Bearer " + adminUser.body.token);

    expect(response.statusCode).toBe(200);
    expect(updatedUser.body._id).toStrictEqual(newUser.body._id);
    expect(updatedUser.body.displayName).toStrictEqual("Jessica Yo");
  });

  it(`ERROR - GET ${idEndPointUrl} - should return 404 when non-existent user ID given`, async () => {
    // Send request to protected/admin endpoint using adminUser JWT Token
    const response = await request(app)
      .get(endpointUrl + "6036907cec0ac70918837817")
      .set("Authorization", "Bearer " + adminUser.body.token);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toStrictEqual("UserService: User not found.");
  });
});

describe(updateProfileEndPointUrl, () => {
  beforeAll(async () => {
    adminUser = await request(app).post(endpointUrl).send(users[0]);

    await request(app)
      .put(updateProfileEndPointUrl)
      .set("Authorization", "Bearer " + adminUser.body.token)
      .send({ isAdmin: true });
  });
  afterAll(async () => {
    await UserModel.collection.drop().catch((error) => {
      let message;
      if (error.message == "ns not found")
        message = "User collection does not exist, so it cannot be dropped.";
      else message = error.message;

      console.log(`Error dropping User collection - ${message}`);
    });
  });
  test(`GET ${updateProfileEndPointUrl}`, async () => {
    const newUser = await request(app).post(endpointUrl).send(users[1]);

    const response = await request(app)
      .get(updateProfileEndPointUrl)
      .set("Authorization", "Bearer " + newUser.body.token);

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(newUser.body._id);
    expect(response.body.displayName).toBe(newUser.body.displayName);
  });

  test(`PUT ${updateProfileEndPointUrl}`, async () => {
    const newUser = await request(app).post(endpointUrl).send(users[2]);

    expect(newUser.body.displayName).toStrictEqual(users[2].displayName);

    const response = await request(app)
      .put(updateProfileEndPointUrl)
      .set("Authorization", "Bearer " + newUser.body.token)
      .send({
        displayName: "Jessica Yo",
      });

    const updatedUser = await request(app)
      .get(updateProfileEndPointUrl)
      .set("Authorization", "Bearer " + newUser.body.token);

    expect(response.statusCode).toBe(200);
    expect(updatedUser.body._id).toStrictEqual(newUser.body._id);
    expect(updatedUser.body.displayName).toStrictEqual("Jessica Yo");
  });
});
