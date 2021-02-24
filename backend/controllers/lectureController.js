import asyncHandler from "express-async-handler";
import Lecture from "../models/lectureModel.js";

// @desc    Fetch all lectures
// @route   GET /api/lectures
// @access  Public
const getLectures = asyncHandler(async (req, res) => {
  const lectures = await Lecture.find({});
  res.json(lectures);
});

// @desc    Fetch single lecture
// @route   GET /api/lectures/:id
// @access  Public
const getLecturesById = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    res.json(lecture);
  } else {
    res.status(404);
    throw new Error("Lecture not found");
  }
});

// @desc    Delete a lecture
// @route   DELETE /api/lectures/:id
// @access  Private/Admin
const deleteLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    await lecture.remove();
    res.json({ message: "Lecture removed." });
  } else {
    res.status(404);
    throw new Error("Lecture not found");
  }
});

export { getLectures, getLecturesById, deleteLecture };
