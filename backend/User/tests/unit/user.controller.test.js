import httpMocks from "node-mocks-http";

import UserController from "../../controller/userControllerImpl.js";
import UserService from "../../services/UserService.js";
import users from "../mock-data/users.js";

let req, res, next, user;

UserService.registerUser = jest.fn();
UserService.getAllUsers = jest.fn();

const controller = UserController(UserService);

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

describe("UserController.getUsers", () => {
  it("should have a getUsers function", () => {
    expect(typeof controller.getUsers).toBe("function");
  });

  it("should call UserService.getAllUsers()", async () => {
    await controller.getUsers(req, res, next);
    expect(UserService.getAllUsers).toBeCalled();
  });

  it("should return response with status 200 and all the users", async () => {
    UserService.getAllUsers.mockReturnValue(users);
    await controller.getUsers(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(users);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error while finding all users." };
    const rejectedPromise = Promise.reject(errorMessage);

    UserService.getAllUsers.mockReturnValue(rejectedPromise);

    await controller.getUsers(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("UserController.registerUser", () => {
  beforeEach(() => {
    user = users[0];
    req.body = user;
  });

  it("should have a registerUser function", () => {
    expect(typeof controller.registerUser).toBe("function");
  });

  it("it should call UserService.registerUser", () => {
    controller.registerUser(req, res, next);

    expect(UserService.registerUser).toBeCalledWith({
      displayName: user.displayName,
      email: user.email,
      password: user.password,
    });
  });

  it("should return 201 response code", async () => {
    await controller.registerUser(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    UserService.registerUser.mockReturnValue(registeredUser);

    await controller.registerUser(req, res, next);

    expect(res._getJSONData()).toStrictEqual(registeredUser);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Password property missing" };
    const rejectedPromise = Promise.reject(errorMessage);

    UserService.registerUser.mockReturnValue(rejectedPromise);

    await controller.registerUser(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});
