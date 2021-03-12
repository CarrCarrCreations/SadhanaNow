import request from "supertest";

import app from "../../../app.js";
import users from "../mock-data/users.js";
import UserModel from "../../repo/models/userModel";
import connectDB from "../../../config/db.js";

connectDB(process.env.MONGO_TEST_URI);

const endpointUrl = "/api/users/";

describe(endpointUrl, () => {
  afterEach(async () => {
    UserModel.collection.drop();
  });

  it(`POST ${endpointUrl}`, async () => {
    const response = await request(app).post(endpointUrl).send(users[0]);

    expect(response.statusCode).toBe(201);
    expect(response.body.displayName).toBe(users[0].displayName);
    expect(response.body.email).toBe(users[0].email);
  });
});
