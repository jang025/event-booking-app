const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const authController = require("./controllers/authController");
const eventController = require("./controllers/eventController");
const bookingController = require("./controllers/bookingController");

mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes go here
app.use("/api/auth", authController);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
