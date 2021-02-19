import express from "express";
import {
  getLectures,
  getLecturesById,
} from "../controllers/lectureController.js";

const router = express.Router();

router.route("/").get(getLectures);
router.route("/:id").get(getLecturesById);

export default router;
