import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";

import lectureRoutes from "./routes/lectureRoutes.js";
import userRoutes from "./User/routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/lectures", lectureRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAY_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

export default app;
