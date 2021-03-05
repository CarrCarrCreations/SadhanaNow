import express from "express";
import UserController from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(UserController.registerUser)
  .get(protect, admin, UserController.getUsers);
router.post("/login", UserController.authUser);
router
  .route("/profile")
  .get(protect, UserController.getUserProfile)
  .put(protect, UserController.updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, UserController.deleteUser)
  .get(protect, admin, UserController.getUserById)
  .put(protect, admin, UserController.updateUser);

export default router;
