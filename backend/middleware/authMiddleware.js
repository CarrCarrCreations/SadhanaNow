import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// https://courses.reactsecurity.io/courses/react-security-fundamentals/297576-getting-started/864613-tour-the-application
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(id);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized. Token failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized. No token found.");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin.");
  }
};

export { protect, admin };
