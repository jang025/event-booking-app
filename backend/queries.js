require("dotenv").config();
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const { faker } = require("@faker-js/faker");
const User = require("./models/User");

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  mongoose.set("debug", true);
  console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

const createUsers = async () => {
  // const saltRounds = 6;
  const users = [
    {
      username: "simon",
      password: "321",
    },
    {
      username: "kristie",
      password: "123",
    },
  ];
  // await User.deleteMany();
  await User.create(users);
};

const runQueries = async () => {
  console.log("Queries running.");
  // The functions calls to run queries in our db will go here as we write them.
  await createUsers();
};

connect();
/*------------------------------ Query Functions -----------------------------*/
