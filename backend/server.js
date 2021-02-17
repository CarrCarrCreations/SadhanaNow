const express = require("express");
const cors = require("cors");
const lectures = require("./data/lectures");

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

app.listen(5000, console.log(`Server running on port 5000`));
