import dotenv from "dotenv";

import UserService from "../../services/UserServiceImpl.js";
import UserRepo from "../../repo/UserRepo";
import users from "../mock-data/users.js";
import registeredUsers from "../mock-data/registeredUsers.js";

dotenv.config();

UserRepo.findOne = jest.fn();
UserRepo.update = jest.fn();
UserRepo.create = jest.fn();

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

describe("UserService.updateUser", () => {
  it("should have an authUserEmailAndPassword function", () => {
    expect(typeof userService.updateUser).toBe("function");
  });

  it("should call UserRepo.update()", async () => {
    const _id = "604babb1d2455814bbc9392e";
    const changedEntry = {
      displayName: "new Name!",
    };

    UserRepo.update.mockReturnValue(true);
    const regUser = registeredUsers[0];
    regUser.displayName = "new Name!";
    UserRepo.findOne.mockReturnValue(regUser);

    const request = { _id, changedEntry };
    const { response, error } = await userService.updateUser(request);

    expect(error).toBe(null);
    expect(UserRepo.update).toHaveBeenCalledWith(request);
  });

  it("should call UserRepo.findOne()", async () => {
    const _id = "604babb1d2455814bbc9392e";
    const changedEntry = {
      displayName: "new Name!",
    };

    UserRepo.update.mockReturnValue(true);
    const regUser = registeredUsers[1];
    regUser.displayName = "new Name!";
    UserRepo.findOne.mockReturnValue(regUser);

    const request = { _id, changedEntry };
    const { response, error } = await userService.updateUser(request);

    expect(error).toBe(null);
    expect(UserRepo.findOne).toHaveBeenCalledWith({ _id });
  });

  it("should return response with updated user object payload", async () => {
    const _id = "604babb1d2455814bbc9392e";
    const changedEntry = {
      displayName: "new Name!",
    };

    UserRepo.update.mockReturnValue(true);
    const regUser = registeredUsers[2];
    regUser.displayName = "new Name!";
    UserRepo.findOne.mockReturnValue(regUser);

    const request = { _id, changedEntry };
    const { response, error } = await userService.updateUser(request);

    expect(error).toBe(null);
    expect(response._id).toBe(regUser._id);
    expect(response.displayName).toBe("new Name!");
  });

  it("should return error response when findOne() => null", async () => {
    const _id = "604babb1d2455814bbc9392e";
    const changedEntry = {
      displayName: "new Name!",
    };
    const request = { _id, changedEntry };

    UserRepo.update.mockReturnValue(true);
    UserRepo.findOne.mockReturnValue(null);

    const { response, error } = await userService.updateUser(request);

    expect(response).toBe(null);
    expect(error.message).toBe("UserService: User not found");
    expect(error.statusCode).toBe(404);
  });

  it("should handle thrown errors", async () => {
    const errorMessage = { message: "UserService: User not found" };
    const rejectedPromise = Promise.reject(errorMessage);

    const _id = "604babb1d2455814bbc9392e";
    const changedEntry = {
      displayName: "new Name!",
    };
    const request = { _id, changedEntry };

    UserRepo.update.mockReturnValue(rejectedPromise);

    expect.assertions(1);
    try {
      await userService.updateUser(request);
    } catch (error) {
      expect(error.message).toMatch("UserService: User not found");
    }
  });
});

describe("UserService.registerUser", () => {
  it("should have an registerUser function", () => {
    expect(typeof userService.registerUser).toBe("function");
  });

  it("should call UserRepo.findOne() and UserRepo.create()", async () => {
    const userInfo = {
      displayName: "Liam",
      email: "admin@example.com",
      password: 123456,
    };

    UserRepo.findOne.mockReturnValue(null);
    UserRepo.create.mockReturnValue(registeredUsers[3]);
    const { response, error } = await userService.registerUser(userInfo);

    expect(error).toBe(null);
    expect(UserRepo.findOne).toHaveBeenCalledWith({ email: userInfo.email });
    expect(UserRepo.create).toHaveBeenCalledWith(userInfo);
  });

  it("should return response with newly registered user object", async () => {
    const user = registeredUsers[4];

    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      password: 123456,
    };

    UserRepo.findOne.mockReturnValue(null);
    UserRepo.create.mockReturnValue(user);

    const { response, error } = await userService.registerUser(userInfo);

    expect(error).toBe(null);
    expect(response.displayName).toBe(userInfo.displayName);
    expect(response.email).toBe(userInfo.email);
  });

  it("should return error response when findOne() => userModel", async () => {
    const user = registeredUsers[4];
    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      password: 123456,
    };

    UserRepo.findOne.mockReturnValue(user);

    const { response, error } = await userService.registerUser(userInfo);

    expect(response).toBe(null);
    expect(error.message).toBe("UserService: User already exists.");
    expect(error.statusCode).toBe(400);
  });
  it("should handle thrown errors", async () => {
    const errorMessage = { message: "Internal Server Error" };
    const rejectedPromise = Promise.reject(errorMessage);

    const user = registeredUsers[4];
    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      password: 123456,
    };

    UserRepo.findOne.mockReturnValue(rejectedPromise);

    expect.assertions(1);
    try {
      await userService.registerUser(userInfo);
    } catch (error) {
      expect(error.message).toMatch("Internal Server Error");
    }
  });
});

describe("UserService.getUserById", () => {
  it("should have an getUserById function", () => {
    expect(typeof userService.getUserById).toBe("function");
  });

  it("should call UserRepo.findOne()", async () => {
    const _id = "604babb1d2455814bbc9392e";
    const regUser = registeredUsers[1];

    UserRepo.findOne.mockReturnValue(regUser);

    const { response, error } = await userService.getUserById(_id);

    expect(error).toBe(null);
    expect(UserRepo.findOne).toHaveBeenCalledWith({ _id });
  });

  it("should return user object", async () => {
    const regUser = registeredUsers[1];

    UserRepo.findOne.mockReturnValue(regUser);

    const { response, error } = await userService.getUserById(regUser._id);

    expect(error).toBe(null);
    expect(response._id).toBe(regUser._id);
    expect(response.displayName).toBe(regUser.displayName);
    expect(response.email).toBe(regUser.email);
    expect(response.isAdmin).toBe(regUser.isAdmin);
  });

  it("should return error response when UserRepo.findOne() => null", async () => {
    const _id = "604babb1d2455814bbc9392e";

    UserRepo.findOne.mockReturnValue(null);

    const { response, error } = await userService.getUserById(_id);

    expect(response).toBe(null);
    expect(error.message).toBe("UserService: User not found.");
    expect(error.statusCode).toBe(404);
  });

  it("should handle thrown errors", async () => {
    const errorMessage = { message: "Internal Server Error" };
    const rejectedPromise = Promise.reject(errorMessage);
    const _id = "604babb1d2455814bbc9392e";

    UserRepo.findOne.mockReturnValue(rejectedPromise);

    expect.assertions(1);
    try {
      await userService.getUserById({ _id });
    } catch (error) {
      expect(error.message).toMatch("Internal Server Error");
    }
  });
});
