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

    const authUser = await userService.authUserEmailAndPassword({
      email,
      password,
    });

    expect(authUser.response.email).toBe(email);
    expect(authUser.response.token).toBeTruthy();
  });

  it("should return error response when findOne() => null", async () => {
    const email = "admin@example.com";
    const password = 123456;

    UserRepo.findOne.mockReturnValue(null);

    const authUser = await userService.authUserEmailAndPassword({
      email,
      password,
    });

    expect(authUser.error.message).toBe(
      "UserService: Invalid email or password"
    );
    expect(authUser.error.statusCode).toBe(400);
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
