import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import UserService from "../services/UserService.js";

/**
 * @function authUser
 * @description Authenticate user and generate JWT Token
 * <br>Access: Public
 * @route POST /api/users/login
 * @returns {User} The currently logged in user
 */
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.authUserEmailAndPassword(email, password);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @function getUserProfile
 * @description Get user profile
 * <br>Access: Public
 * @route GET /api/users/profile
 * @access Private
 * @returns {User} The currently logged in user
 */
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;

  try {
    res.json(UserService.getLoggedInUserProfile(user));
  } catch (error) {
    next(error);
  }
});

/**
 * @function updateUserProfile
 * @description Update user profile.
 * <br>Access: Private
 * @route   PUT /api/users/profile
 * @returns {User} The updated user
 */
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const body = req.body;

  try {
    res.json(UserService.updateUserProfile(user, body));
  } catch (error) {
    next(error);
  }
});

/**
 * @function registerUser
 * @description Register a new user
 * <br>Access: Public
 * @route   POST /api/users/
 * @returns {User} The newly registered user
 */
const registerUser = asyncHandler(async (req, res) => {
  const { displayName, email, password } = req.body;

  try {
    res
      .status(201)
      .json(UserService.registerUser(displayName, email, password));
  } catch (error) {
    next(error);
  }
});

// @desc    Get all users
// @route   GET /api/users/
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get a user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUserById,
  getUserProfile,
  updateUser,
  updateUserProfile,
  registerUser,
  getUsers,
  deleteUser,
};
