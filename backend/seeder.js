import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import lectures from "./data/lectures.js";
import User from "./models/userModel.js";
import Lecture from "./models/lectureModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear all data from DBs before filling  with seed data
    await Order.deleteMany();
    await Lecture.deleteMany();
    await User.deleteMany();

    // Array of created users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Set all lectures to be created by the Admin user
    const sampleLectures = lectures.map((lecture) => {
      return { ...lecture, user: adminUser };
    });

    await Lecture.insertMany(sampleLectures);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear all data from DBs before filling  with seed data
    await Order.deleteMany();
    await Lecture.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
