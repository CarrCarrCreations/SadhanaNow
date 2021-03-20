import httpMocks from "node-mocks-http";

import UserController from "../../controller/userControllerImpl.js";
import UserService from "../../services/UserService.js";
import users from "../mock-data/users.js";
import registeredUser from "../mock-data/registeredUsers.js";

let req, res, next, user;

UserService.registerUser = jest.fn();
UserService.getAllUsers = jest.fn();
UserService.getUserById = jest.fn();
UserService.updateUser = jest.fn();
UserService.authUserEmailAndPassword = jest.fn();
UserService.getLoggedInUserProfile = jest.fn();
UserService.deleteUser = jest.fn();

const userController = UserController(UserService);

beforeEach(() => {
  req = httpMocks.createRequest();
  req.user = {
    _id: "6036907cec0ac70918837819",
  };

  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("UserController.getUserById", () => {
  it("should have a getUserById function", () => {
    expect(typeof userController.getUserById).toBe("function");
  });

  it("should call UserService.getUserById()", async () => {
    req.params.id = "6036907cec0ac70918837819";
    await userController.getUserById(req, res, next);

    expect(UserService.getUserById).toBeCalledWith({
      _id: "6036907cec0ac70918837819",
    });
  });

  it("should return response with status 200 and user object", async () => {
    UserService.getUserById.mockReturnValue({
      response: users[0],
      error: null,
    });

    await userController.getUserById(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(users[0]);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "id property missing" };
    const rejectedPromise = Promise.reject(errorMessage);

    UserService.getUserById.mockReturnValue(rejectedPromise);

    await userController.getUserById(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("UserController.getUsers", () => {
  it("should have a getUsers function", () => {
    expect(typeof userController.getUsers).toBe("function");
  });

  it("should call UserService.getAllUsers()", async () => {
    await userController.getUsers(req, res, next);
    expect(UserService.getAllUsers).toBeCalled();
  });

  it("should return response with status 200 and all the users", async () => {
    UserService.getAllUsers.mockReturnValue({
      response: users,
      error: null,
    });
    await userController.getUsers(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(users);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error while finding all users." };
    const rejectedPromise = Promise.reject(errorMessage);

    UserService.getAllUsers.mockReturnValue(rejectedPromise);

    await userController.getUsers(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("UserController.getUserProfile", () => {
  it("should have a getUserProfile function", () => {
    expect(typeof userController.getUserProfile).toBe("function");
  });

  it("should call UserService.getLoggedInUserProfile()", async () => {
    await userController.getUserProfile(req, res, next);
    expect(UserService.getLoggedInUserProfile).toHaveBeenCalledWith({
      user: req.user,
    });
  });

  it("should return response with status 200 and all the users", async () => {
    UserService.getLoggedInUserProfile.mockReturnValue({
      response: users[0],
      error: null,
    });
    await userController.getUserProfile(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(users[0]);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error while finding all users." };
    const rejectedPromise = Promise.reject(errorMessage);

    UserService.getLoggedInUserProfile.mockReturnValue(rejectedPromise);

    await userController.getUserProfile(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("UserController.registerUser", () => {
  beforeEach(() => {
    user = users[0];
    req.body = user;
  });

  it("should have a registerUser function", () => {
    expect(typeof userController.registerUser).toBe("function");
  });

  it("it should call UserService.registerUser", () => {
    userController.registerUser(req, res, next);

    expect(UserService.registerUser).toBeCalledWith({
      displayName: user.displayName,
      email: user.email,
      password: user.password,
    });
  });

  it("should return 201 response code", async () => {
    UserService.registerUser.mockReturnValue({
      response: registeredUser,
      error: null,
    });

    await userController.registerUser(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    UserService.registerUser.mockReturnValue({
      response: registeredUser,
      error: null,
    });

    await userController.registerUser(req, res, next);

    expect(res._getJSONData()).toStrictEqual(registeredUser);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Password property missing" };
    const rejectedPromise = Promise.reject(errorMessage);

    UserService.registerUser.mockReturnValue(rejectedPromise);

    await userController.registerUser(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("UserController.updateUser", () => {
  it("should have a updateUser function", () => {
    expect(typeof userController.updateUser).toBe("function");
  });

  it("should call UserService.updateUser()", async () => {
    req.params.id = "6036907cec0ac70918837819";
    req.body.displayName = "Liam";

    await userController.updateUser(req, res, next);

    expect(UserService.updateUser).toBeCalledWith({
      _id: "6036907cec0ac70918837819",
      changedEntry: {
        displayName: "Liam",
      },
    });
  });

  it("should return response with status 200 and user object", async () => {
    UserService.updateUser.mockReturnValue({
      response: users[0],
      error: null,
    });

    await userController.updateUser(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(users[0]);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "id property missing" };
    const rejectedPromise = Promise.reject(errorMessage);

    UserService.updateUser.mockReturnValue(rejectedPromise);

    await userController.updateUser(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("UserController.updateUserProfile", () => {
  it("should have a updateUserProfile function", () => {
    expect(typeof userController.updateUserProfile).toBe("function");
  });

  it("should call UserService.updateUserProfile()", async () => {
    req.body.displayName = "Liam";

    await userController.updateUserProfile(req, res, next);

    expect(UserService.updateUser).toBeCalledWith({
      _id: req.user._id,
      changedEntry: {
        displayName: "Liam",
      },
    });
  });

  it("should return response with status 200 and user object", async () => {
    UserService.updateUser.mockReturnValue({
      response: users[0],
      error: null,
    });

    await userController.updateUserProfile(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(users[0]);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "id property missing" };
    const rejectedPromise = Promise.reject(errorMessage);

    UserService.updateUser.mockReturnValue(rejectedPromise);

    await userController.updateUser(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("UserController.authUser", () => {
  it("should have an authUser function", () => {
    expect(typeof userController.authUser).toBe("function");
  });

  it("should call UserService.authUserEmailAndPassword()", async () => {
    req.body.email = "admin@example.com";
    req.body.password = 123456;

    await userController.authUser(req, res, next);

    expect(UserService.authUserEmailAndPassword).toBeCalledWith({
      email: "admin@example.com",
      password: 123456,
    });
  });

  it("should return response with status 200 and user object", async () => {
    UserService.authUserEmailAndPassword.mockReturnValue({
      response: users[0],
      error: null,
    });

    await userController.authUser(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(users[0]);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "id property missing" };
    const rejectedPromise = Promise.reject(errorMessage);

    UserService.authUserEmailAndPassword.mockReturnValue(rejectedPromise);

    await userController.authUser(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("UserController.deleteUser", () => {
  it("should have a deleteUser function", () => {
    expect(typeof userController.deleteUser).toBe("function");
  });

  it("should call UserService.deleteUser()", async () => {
    req.params.id = "6036907cec0ac70918837819";
    await userController.deleteUser(req, res, next);

    expect(UserService.deleteUser).toBeCalledWith({
      _id: "6036907cec0ac70918837819",
    });
  });

  it("should return response with status 200 and user object", async () => {
    UserService.deleteUser.mockReturnValue({
      response: { message: "User successfully removed." },
      error: null,
    });

    await userController.deleteUser(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({
      message: "User successfully removed.",
    });
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "id property missing" };
    const rejectedPromise = Promise.reject(errorMessage);

    UserService.deleteUser.mockReturnValue(rejectedPromise);

    await userController.deleteUser(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});
