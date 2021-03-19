import httpMocks from "node-mocks-http";

import UserController from "../../controller/userControllerImpl.js";
import UserService from "../../services/UserService.js";
import users from "../mock-data/users.js";

let req, res, next, user;

UserService.registerUser = jest.fn();
UserService.getAllUsers = jest.fn();
UserService.getUserById = jest.fn();

const userController = UserController(UserService);

const registeredUser = {
  _id: "604babb1d2455814bbc9392e",
  displayName: "liam",
  email: "testLiam@example.com",
  isAdmin: false,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGJhYmIxZDI0NTU4MTRiYmM5MzkyZSIsImlhdCI6MTYxNTU3MTg5MCwiZXhwIjoxNjE4MTYzODkwfQ.x0vNHqtMx8VG9oPVrCkWFnWB2MzoJOw0BQQTZZ8XZfQ",
};

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("UserController.getUserById", () => {
  it("should have a getUserById", () => {
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
    UserService.getUserById.mockReturnValue(users[0]);

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
    UserService.getAllUsers.mockReturnValue(users);
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
    await userController.registerUser(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    UserService.registerUser.mockReturnValue(registeredUser);

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
