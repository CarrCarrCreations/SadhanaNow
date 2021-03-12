import UserController from "../../controller/userControllerImpl.js";
import UserModel from "../../repo/models/userModel.js";

const UserService = jest.fn();
const controller = UserController(UserService);

describe("UserController.registerUser", () => {
  it("should have a registerUser function", () => {
    expect(typeof UserController.registerUser).toBe("function");
  });
});
