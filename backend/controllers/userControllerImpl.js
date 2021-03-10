import asyncHandler from "express-async-handler";

const authUser = (UserService) =>
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await UserService.authUserEmailAndPassword({
        email,
        password,
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

const getUserProfile = (UserService) =>
  asyncHandler(async (req, res, next) => {
    const user = req.user;

    try {
      res.json(await UserService.getLoggedInUserProfile({ user }));
    } catch (error) {
      next(error);
    }
  });

const updateUserProfile = (UserService) =>
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const body = req.body;

    try {
      res.json(await UserService.updateUserProfile(user, body));
    } catch (error) {
      next(error);
    }
  });

const registerUser = (UserService) =>
  asyncHandler(async (req, res, next) => {
    const { displayName, email, password } = req.body;

    try {
      res
        .status(201)
        .json(await UserService.registerUser({ displayName, email, password }));
    } catch (error) {
      next(error);
    }
  });

const getUsers = (UserService) =>
  asyncHandler(async (req, res, next) => {
    try {
      res.json(await UserService.getAllUsers());
    } catch (error) {
      next(error);
    }
  });

const deleteUser = (UserService) =>
  asyncHandler(async (req, res, next) => {
    try {
      res.json(await UserService.deleteUser({ _id: `req.param.id` }));
    } catch (error) {
      next(error);
    }
  });

const getUserById = (UserService) =>
  asyncHandler(async (req, res, next) => {
    try {
      res.json(await UserService.getUserById({ _id: `req.param.id` }));
    } catch (error) {
      next(error);
    }
  });

const updateUser = (UserService) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const { displayName, email, isAdmin } = req.body;

    try {
      res.json(
        await UserService.updateUser({ userId, displayName, email, isAdmin })
      );
    } catch (error) {
      next(error);
    }
  });

/**
 *
 *  Object containing all helper methods for User objects
 * @module UserController
 * @param {Object} UserService - Object containing all helper functions for the User objects
 */
const userController = (UserService) => {
  return {
    /**
     * @function authUser
     * @description Authenticate user and generate JWT Token
     * <br>Access: Public
     * @route POST /api/users/login
     * @returns {User} The currently logged in user
     */
    authUser: authUser(UserService),
    /**
     * @function getUserById
     * @description Get a user by ID
     * <br>Access: Private/Admin
     * @route GET /api/users/:id
     * @returns {User} User Object
     */
    getUserById: getUserById(UserService),
    /**
     * @function getUserProfile
     * @description Get user profile
     * <br>Access: Public
     * @route GET /api/users/profile
     * @access Private
     * @returns {User} The currently logged in user
     */
    getUserProfile: getUserProfile(UserService),
    /**
     * @function updateUser
     * @description Update user
     * <br>Access: Private/Admin
     * @route PUT /api/users/:id
     * @returns {User} The updated user
     */
    updateUser: updateUser(UserService),
    /**
     * @function updateUserProfile
     * @description Update user profile.
     * <br>Access: Private
     * @route   PUT /api/users/profile
     * @returns {User} The updated user
     */
    updateUserProfile: updateUserProfile(UserService),
    /**
     * @function registerUser
     * @description Register a new user
     * <br>Access: Public
     * @route   POST /api/users/
     * @returns {User} The newly registered user
     */
    registerUser: registerUser(UserService),
    /**
     * @function getUsers
     * @description Get all users
     * <br>Access: Private/Admin
     * @route GET /api/users/
     * @returns {User[]} List of all Users in the DB
     */
    getUsers: getUsers(UserService),
    /**
     * @function deleteUser
     * @description Delete a user
     * <br>Access: Private/Admin
     * @route   DELETE /api/users/:id
     * @returns {Object} Object with `message` parameter
     */
    deleteUser: deleteUser(UserService),
  };
};

export default userController;
