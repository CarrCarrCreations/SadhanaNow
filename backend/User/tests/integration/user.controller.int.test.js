import request from "supertest";
import server from "../../../server.js";
import users from "../mock-data/users.js";

const endpointUrl = "/api/users/";

describe(endpointUrl, () => {
  it(`POST ${endpointUrl}`, async () => {
    const response = await request(server).post(endpointUrl).send(users[0]);

    expect(response.statusCode).toBe(201);
    expect(response.body.displayName).toBe(users[0].displayName);
  });
});
