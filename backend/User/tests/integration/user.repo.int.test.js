import Collection from "../../repo/models/userModel.js";
import UserRepo from "../../repo/UserRepoImpl.js";
import users from "../mongodb/mock-data/users";
import { connect, closeDatabase } from "../mongodb/db-handler.js";

// Collection.create = jest.fn();

const userRepo = UserRepo(Collection);

// Connect to in-memory MongoDB database
beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());
describe("UserRepo.create", () => {
  it("should have a create function", () => {
    expect(typeof userRepo.create).toBe("function");
  });

  it("should create a new user object", async () => {
    const user = users[0];
    const request = {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
    };

    const newUser = await Collection.create(request);
    expect(newUser.displayName).toBe(request.displayName);
    expect(newUser.email).toBe(request.email);
  });

  it("should handle thrown errors", async () => {
    const user = users[0];
    const request = {
      displayName: user.displayName,
      email: user.email,
    };

    expect.assertions(1);
    try {
      await Collection.create(request);
    } catch (error) {
      expect(error.message).toMatch(
        "User validation failed: password: Path `password` is required."
      );
    }
  });
});
