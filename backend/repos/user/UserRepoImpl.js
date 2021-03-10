const create = (Collection) => async (newEntry) => {
  try {
    return await Collection.create(newEntry);
  } catch (error) {
    throw new Error("UserRepo: Internal Server Error");
  }
};

const find = (UserModel) => async () => {
  try {
    return UserModel.find({});
  } catch (error) {
    throw new Error("UserRepo: Internal Server Error");
  }
};

const findById = (UserModel) => async (userId) => {
  try {
    return await UserModel.findById(userId).select("-password");
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

const remove = () => async (user) => {
  try {
    user.remove();
    return true;
  } catch (error) {
    throw new Error("UserRepo: Error removing user from database");
  }
};

const save = () => async (user) => {
  try {
    user.save();
    return true;
  } catch (error) {
    throw new Error("UserRepo: Error saving user to database");
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
    create: create(UserModel),
    /**
     * @function find
     * @description Find all Users
     * @returns {User}
     */
    find: find(UserModel),
    /**
     * @function findById
     * @description Find User by supplied ID
     * @param {string} userId - user ID
     * @returns {User}
     */
    findById: findById(UserModel),
    /**
     * @function findUserByEmail
     * @description Find User by supplied email
     * @param {string} email - user email
     * @returns {User}
     */
    findUserByEmail: findUserByEmail(UserModel),
    /**
     * @function matchPassword
     * @description Match supplied password to stored password
     * @param {string} password - supplied user password
     * @returns {boolean}
     */
    matchPassword: matchPassword(UserModel),
    /**
     * @function remove
     * @description Delete a user from the database
     * @param {User} User object
     * @returns {boolean}
     */
    remove: remove(),
    /**
     * @function save
     * @description Save a user to the database
     * @param {User} User object
     * @returns {boolean}
     */
    save: save(),
  };
};

export default UserRepo;
