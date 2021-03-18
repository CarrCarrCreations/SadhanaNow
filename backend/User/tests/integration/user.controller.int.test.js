import request from "supertest";

import app from "../../../app.js";
import users from "../mock-data/users.js";
import UserModel from "../../repo/models/userModel";
import connectDB from "../../../config/db.js";

connectDB(process.env.MONGO_TEST_URI);

const endpointUrl = "/api/users/";

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

  it(`POST ${endpointUrl}`, async () => {
    const response = await request(app).post(endpointUrl).send(users[0]);

    expect(response.statusCode).toBe(201);
    expect(response.body.displayName).toBe(users[0].displayName);
    expect(response.body.email).toBe(users[0].email);
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
