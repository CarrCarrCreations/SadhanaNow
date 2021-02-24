import express from "express";
import {
  deleteLecture,
  getLectures,
  getLecturesById,
} from "../controllers/lectureController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getLectures);
router.route("/:id").get(getLecturesById).delete(protect, admin, deleteLecture);

export default router;
