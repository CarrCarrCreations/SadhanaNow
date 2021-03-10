import User from "../../models/User.js";
import { Error } from "../../middleware/errorMiddleware.js";

const create = (Collection) => async (newEntry) => {
  try {
    return await Collection.create(newEntry);
  } catch (error) {
    throw Error("UserRepo: Error while creating new database entry");
  }
};

const findMany = (Collection) => async (query = {}) => {
  try {
    return await Collection.find(query);
  } catch (error) {
    throw Error("UserRepo: Error while reading from database");
  }
};

const findOne = (Collection) => async (query = {}) => {
  try {
    return await Collection.findOne(query);
  } catch (error) {
    throw Error("UserRepo: Error while reading from database");
  }
};

const remove = (Collection) => async ({ _id }) => {
  try {
    return await Collection.remove({ _id });
  } catch (error) {
    throw Error("UserRepo: Error while deleting entry from database");
  }
};

const update = (Collection) => async ({ _id, changedEntry }) => {
  try {
    return await Collection.update({ _id }, { $set: changedEntry });
  } catch (error) {
    throw Error("UserRepo: " + error.message);
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
    remove: remove(UserModel),
    /**
     * @function save
     * @description Save a user to the database
     * @param {User} User object
     * @returns {boolean}
     */
    update: update(UserModel),
  };
};

export default UserRepo;
