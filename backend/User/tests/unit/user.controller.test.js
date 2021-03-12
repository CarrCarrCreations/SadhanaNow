import httpMocks from "node-mocks-http";

import UserController from "../../controller/userControllerImpl.js";
import UserService from "../../services/UserService.js";
import users from "../mock-data/users.js";

UserService.registerUser = jest.fn();
const controller = UserController(UserService);

let req, res, next;

beforeEach(() => {
  // Setup req, res, and next
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("UserController.registerUser", () => {
  it("should have a registerUser function", () => {
    expect(typeof controller.registerUser).toBe("function");
  });

  it("it should call UserService.registerUser", () => {
    const user = users[0];
    req.body = user;

    controller.registerUser(req, res, next);

    expect(UserService.registerUser).toBeCalledWith({
      displayName: user.displayName,
      email: user.email,
      password: user.password,
    });
  });
});
