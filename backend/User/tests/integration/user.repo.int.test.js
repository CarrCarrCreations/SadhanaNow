import Collection from "../../repo/models/userModel.js";
import UserRepo from "../../repo/UserRepoImpl.js";
import users from "../mongodb/mock-data/users";
import registeredUsers from "../mongodb/mock-data/registeredUsers.js";
import {
  connect,
  clearDatabase,
  closeDatabase,
} from "../mongodb/db-handler.js";

const userRepo = UserRepo(Collection);

// Connect to in-memory MongoDB database
beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
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

    const newUser = await userRepo.create(request);
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
      await userRepo.create(request);
    } catch (error) {
      expect(error.message).toMatch(
        "User validation failed: password: Path `password` is required."
      );
    }
  });
});

describe("UserRepo.findMany", () => {
  it("should have a findMany function", () => {
    expect(typeof userRepo.findMany).toBe("function");
  });

  it("should return a list of user objects", async () => {
    const newUser = await userRepo.create(users[1]);
    const newUser2 = await userRepo.create(users[2]);
    const response = await userRepo.findMany();

    expect(Array.isArray(response)).toBeTruthy();
    expect(response.length).toBe(2);
    expect(response[0].displayName).toStrictEqual(newUser.displayName);
    expect(response[0].email).toStrictEqual(newUser.email);
    expect(response[1].displayName).toStrictEqual(newUser2.displayName);
    expect(response[1].email).toStrictEqual(newUser2.email);
  });

  it("should handle thrown errors", async () => {
    expect.assertions(1);
    try {
      await userRepo.findMany();
      throw new Error("Internal Server Error");
    } catch (error) {
      expect(error.message).toMatch("Internal Server Error");
    }
  });
});

describe("UserRepo.findOne", () => {
  it("should have a findOne function", () => {
    expect(typeof userRepo.findOne).toBe("function");
  });

  it("should return a user object", async () => {
    const newUser = await userRepo.create(users[1]);

    const response = await userRepo.findOne({ email: newUser.email });

    expect(response.displayName).toStrictEqual(newUser.displayName);
    expect(response.email).toStrictEqual(newUser.email);
  });

  it("should handle thrown errors", async () => {
    expect.assertions(1);
    try {
      await userRepo.findOne();
      throw new Error("Internal Server Error");
    } catch (error) {
      expect(error.message).toMatch("Internal Server Error");
    }
  });
});

describe("UserRepo.remove", () => {
  it("should have a remove function", () => {
    expect(typeof userRepo.remove).toBe("function");
  });

  it("should return a user object", async () => {
    const newUser = await userRepo.create(users[1]);

    const response = await userRepo.remove({ _id: newUser._id });

    expect(response).toStrictEqual({ n: 1, ok: 1, deletedCount: 1 });
  });

  it("should handle thrown errors", async () => {
    expect.assertions(1);
    try {
      await userRepo.remove({ _id: "604babb1d2455814bbc9395e" });
      throw new Error("Internal Server Error");
    } catch (error) {
      expect(error.message).toMatch("Internal Server Error");
    }
  });
});
