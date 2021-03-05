const findUserByEmail = (UserModel) =>
  /**
   * Find User by supplied email
   * @param {string} email - user email
   */
  async (email) => {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error("UserRepo: Invalid email or password");
    }
  };

const matchPassword = (UserModel) =>
  /**
   * Match supplied password to stored password
   * @param {string} password - supplied user password
   */
  (password) => {
    return UserModel.matchPassword(password);
  };

const UserRepoImpl = (UserModel) => {
  return {
    findUserByEmail: findUserByEmail(UserModel),
    matchPassword: matchPassword(UserModel),
  };
};

export default UserRepoImpl;
