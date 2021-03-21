import httpMocks from "node-mocks-http";
import dotenv from "dotenv";

import UserService from "../../services/UserServiceImpl.js";
import UserRepo from "../../repo/UserRepo";
import users from "../mock-data/users.js";

dotenv.config();

UserRepo.findOne = jest.fn();

const userService = UserService(UserRepo);

describe("UserService.authUserEmailAndPassword", () => {
  it("should have an authUserEmailAndPassword function", () => {
    expect(typeof userService.authUserEmailAndPassword).toBe("function");
  });

  it("should call UserRepo.findOne()", async () => {
    const email = "admin@example.com";
    const password = 123456;

    const user = users[0];

    user.matchPassword = (password) => true;
    UserRepo.findOne.mockReturnValue(user);

    await userService.authUserEmailAndPassword({
      email,
      password,
    });

    expect(UserRepo.findOne).toHaveBeenCalledWith({ email });
  });

  it("should return response with user object payload", async () => {
    const email = "admin@example.com";
    const password = 123456;

    const user = users[0];

    user.matchPassword = (password) => true;
    UserRepo.findOne.mockReturnValue(user);

    const { response, error } = await userService.authUserEmailAndPassword({
      email,
      password,
    });

    expect(response.email).toBe(email);
    expect(error).toBe(null);
    expect(response.token).toBeTruthy();
  });

  it("should return error response when findOne() => null", async () => {
    const email = "admin@example.com";
    const password = 123456;

    UserRepo.findOne.mockReturnValue(null);

    const { response, error } = await userService.authUserEmailAndPassword({
      email,
      password,
    });

    expect(response).toBe(null);
    expect(error.message).toBe("UserService: Invalid email or password");
    expect(error.statusCode).toBe(400);
  });

  it("should handle thrown errors", async () => {
    const errorMessage = { message: "UserService: Invalid email or password" };
    const rejectedPromise = Promise.reject(errorMessage);
    const email = "admin@example.com";
    const password = 123456;

    UserRepo.findOne.mockReturnValue(rejectedPromise);

    expect.assertions(1);
    try {
      await userService.authUserEmailAndPassword({
        email,
        password,
      });
    } catch (error) {
      expect(error.message).toMatch("UserService: Invalid email or password");
    }
  });
});

describe("UserService.getLoggedInUserProfile", () => {
  it("should have an getLoggedInUserProfile function", () => {
    expect(typeof userService.getLoggedInUserProfile).toBe("function");
  });

  it("should return a new user object", () => {
    const user = users[0];
    const { response, error } = userService.getLoggedInUserProfile(user);

    expect(error).toBe(null);
    expect(response._id).toBe(user._id);
    expect(response.displayName).toBe(user.displayName);
    expect(response.email).toBe(user.email);
    expect(response.isAdmin).toBe(user.isAdmin);
  });

  it("should return error response if no user is found", () => {
    const user = null;
    const { response, error } = userService.getLoggedInUserProfile(user);

    expect(response).toBe(null);
    expect(error.message).toBe("UserService: User not found");
  });
});
