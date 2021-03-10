import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import { Error } from "../middleware/errorMiddleware.js";

const authUserEmailAndPassword = (UserRepo) => async (email, password) => {
  const user = await UserRepo.findUserByEmail(email);

  if (user && (await user.matchPassword(password))) {
    return new User({
      _id: user._id,
      displayName: user.displayName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    throw Error("UserService: Invalid email or password", 400);
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
    throw Error("User not found", 400);
  }
};

const updateUserProfile = (UserRepo) => async (user, reqBody) => {
  if (user) {
    user.displayName = reqBody.displayName || user.displayName;
    user.email = reqBody.email || user.email;
    if (reqBody.password) {
      user.password = reqBody.password;
    }

    const updatedUser = await UserRepo.save();

    return new User({
      _id: updatedUser._id,
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    throw Error("User not found", 400);
  }
};

const registerUser = (UserRepo) => async (displayName, email, password) => {
  const userExists = await UserRepo.findOne({ email });
  if (userExists) {
    throw Error("User already exists.", 400);
  }

  const user = await UserRepo.create({
    displayName,
    email,
    password,
  });

  if (user) {
    return new User({
      _id: user._id,
      displayName: user.displayName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    throw Error("Invalid user data.", 400);
  }
};

const getAllUsers = (UserRepo) => async () => {
  return await UserRepo.find();
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
     * @function updateUserProfile
     * @description Update the currently logged in user
     * @param {User} user - User supplied from req.user
     * @param {Object} reqBody - body supplied from the req.body
     * @returns {User} User
     */
    updateUserProfile: updateUserProfile(UserRepo),
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
  };
};

export default UserService;
