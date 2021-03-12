import UserController from "../../controller/userControllerImpl";

describe("UserController.registerUser", () => {
  it("should have a registerUser function", () => {
    expect(typeof UserController.registerUser).toBe("function");
  });
});
