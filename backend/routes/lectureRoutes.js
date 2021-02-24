import express from "express";
import {
  deleteLecture,
  getLectures,
  getLecturesById,
  updateLecture,
  createLecture,
} from "../controllers/lectureController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getLectures).post(protect, admin, createLecture);
router
  .route("/:id")
  .get(getLecturesById)
  .delete(protect, admin, deleteLecture)
  .put(protect, admin, updateLecture);

export default router;
