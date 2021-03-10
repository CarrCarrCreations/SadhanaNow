const find = (UserModel) => async () => {
  try {
    return UserModel.find({});
  } catch (error) {
    throw new Error("UserRepo: Internal Server Error");
  }
};

const findUserByEmail = (UserModel) => async (email) => {
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    throw new Error("UserRepo: Invalid email or password");
  }
};

const matchPassword = (UserModel) => (password) => {
  return UserModel.matchPassword(password);
};

/**
 *  Object all methods for interacting with MongoDB DB using mongoose
 * @module UserRepo
 * @param {Object} UserModel - mongoose Schema
 */
const UserRepo = (UserModel) => {
  return {
    find: find(UserModel),
    /**
     * @function findUserByEmail
     * @description Find User by supplied email
     * @param {string} email - user email
     */
    findUserByEmail: findUserByEmail(UserModel),
    /**
     * @function matchPassword
     * @description Match supplied password to stored password
     * @param {string} password - supplied user password
     */
    matchPassword: matchPassword(UserModel),
  };
};

export default UserRepo;
