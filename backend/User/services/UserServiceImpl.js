import generateToken from "../../utils/generateToken.js";
import User from "../repo/models/User.js";

const authUserEmailAndPassword = (UserRepo) => async ({ email, password }) => {
  const user = await UserRepo.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return new User({
      _id: user._id,
      displayName: user.displayName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("UserService: Invalid email or password", 400);
  }
};

const getLoggedInUserProfile = () => (user) => {
  if (user) {
    return new User({
      _id: user._id,
      displayName: user.displayName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new Error("User not found", 400);
  }
};

const updateUser = (UserRepo) => async ({ _id, changedEntry }) => {
  try {
    await UserRepo.update({ _id, changedEntry });
    const updatedUser = await UserRepo.findOne({ _id });

    return new User({
      _id: updatedUser._id,
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    throw new Error("UserService: User not found", 404);
  }
};

const registerUser = (UserRepo) => async ({ displayName, email, password }) => {
  try {
    const userExists = await UserRepo.findOne({ email });
    if (userExists) {
      throw new Error("UserService - User already exists.", 400);
    }
  } catch (error) {
    throw new Error(error.message, 400);
  }

  try {
    const user = await UserRepo.create({
      displayName,
      email,
      password,
    });

    return new User({
      _id: user._id,
      displayName: user.displayName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    throw new Error(error.message, 400);
  }
};

const getUserById = (UserRepo) => async ({ _id }) => {
  const user = await UserRepo.findOne({ _id });

  if (user) {
    return user;
  } else {
    throw new Error("User not found", 404);
  }
};

const getAllUsers = (UserRepo) => async () => {
  return await UserRepo.findMany();
};

const deleteUser = (UserRepo) => async ({ _id }) => {
  const user = await UserRepo.findOne({ _id });

  if (user) {
    await UserRepo.remove({ _id });
    return { message: "User removed" };
  } else {
    throw new Error("User not found", 404);
  }
};

/**
 *  Object containing all helper methods for User objects
 * @module UserService
 * @param {Object} UserRepo - Object containing all DB methods to interact with User objects
 */
const UserService = (UserRepo) => {
  return {
    /**
     * @function authUserEmailAndPassword
     * @description Authenticate user by supplied email and password.
     * <br>if successful, generate JTW token and return found user.
     * @param {string} email
     * @param {string} password
     * @returns {User} User
     */
    authUserEmailAndPassword: authUserEmailAndPassword(UserRepo),
    /**
     * @function getLoggedInUserProfile
     * @description Get the logged in user from the JWT Token
     * @param {User} User supplied from req.user
     * @returns {User} User
     */
    getLoggedInUserProfile: getLoggedInUserProfile(),
    /**
     * @function registerUser
     * @description Register a new User
     * @param {string} displayName
     * @param {string} email
     * @param {string} password
     * @returns {User} User
     */
    registerUser: registerUser(UserRepo),
    /**
     * @function getAllUsers
     * @description Returns all users in the DB
     * @returns {User[]} Array of Users
     */
    getAllUsers: getAllUsers(UserRepo),
    /**
     * @function getUserById
     * @description Returns User by supplied ID
     * @param {string} userId
     * @returns {User} User
     */
    getUserById: getUserById(UserRepo),
    /**
     * @function deleteUser
     * @description Delete a user
     * @param {string} userId
     * @returns {Object} Object with `message` parameter
     */
    deleteUser: deleteUser(UserRepo),
    /**
     * @function updateUser
     * @description Update a user's info
     * @param {string} userId
     * @param {string} displayName
     * @param {string} email
     * @param {boolean} isAdmin
     * @returns {User} User
     */
    updateUser: updateUser(UserRepo),
  };
};

export default UserService;
