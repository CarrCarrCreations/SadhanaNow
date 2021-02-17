import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import lectures from "./data/lectures.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/lectures", (req, res) => {
  res.json(lectures);
});

app.get("/api/lectures/:id", (req, res) => {
  const lecture = lectures.find((lecture) => lecture._id === req.params.id);
  res.json(lecture);
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
