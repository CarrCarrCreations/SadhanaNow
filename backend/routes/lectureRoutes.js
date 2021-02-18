import express from "express";
import asyncHandler from "express-async-handler";
import Lecture from "../models/lectureModel.js";
const router = express.Router();

// @desc    Fetch all lectures
// @route   GET /api/lectures
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const lectures = await Lecture.find({});
    res.json(lectures);
  })
);

// @desc    Fetch single lecture
// @route   GET /api/lectures/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);

    if (lecture) {
      res.json(lecture);
    } else {
      res.status(404);
      throw new Error("Lecture not found");
    }
  })
);

export default router;
