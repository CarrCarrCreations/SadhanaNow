const create = (Collection) => async (newEntry) => {
  try {
    return await Collection.create(newEntry);
  } catch (error) {
    throw new Error("UserRepo: Error while creating new database entry");
  }
};

const findMany = (Collection) => async (query = {}) => {
  try {
    return await Collection.find(query);
  } catch (error) {
    throw new Error("UserRepo: Error while reading from database");
  }
};

const findOne = (Collection) => async (query = {}) => {
  try {
    return await Collection.findOne(query);
  } catch (error) {
    throw new Error("UserRepo: Error while reading from database");
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
    /**
     * @function create
     * @description Create a new entry in the database
     * @param {Object} newEntry - object containing new entry's data
     * @returns {User}
     */
    create: create(UserModel),
    /**
     * @function findOne
     * @description Find one entry by provided query
     * @param {Object} query - defaults to {}
     * @returns {User}
     */
    findOne: findOne(UserModel),
    /**
     * @function findMany
     * @description find many entries by provided query
     * @param {Object} query - defaults to {}
     * @returns {User}
     */
    findMany: findMany(UserModel),
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
