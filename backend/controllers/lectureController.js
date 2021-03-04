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

// @desc    Create a lecture
// @route   POST /api/lectures
// @access  Private/Admin
const createLecture = asyncHandler(async (req, res) => {
  const lecture = new Lecture({
    title: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    description: "Sample description",
  });

  const createdLecture = await lecture.save();
  res.status(201).json(createdLecture);
});

// @desc    Update a lecture
// @route   PUT /api/lectures/:id
// @access  Private/Admin
const updateLecture = asyncHandler(async (req, res) => {
  const { title, price, description, image } = req.body;
  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    lecture.title = title;
    lecture.price = price;
    lecture.description = description;
    lecture.image = image;

    const updatedLecture = await lecture.save();
    res.status(201).json(updatedLecture);
  } else {
    res.status(400);
    throw new Error("Lecture not found.");
  }
});

export {
  getLectures,
  getLecturesById,
  deleteLecture,
  createLecture,
  updateLecture,
};
