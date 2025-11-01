const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

//! sign up
const create = async (req, res) => {
  try {
    const { username, password, confirmPassword, email } = req.body;

    const user = await User.findOne({ username });

    // check if all form fields are correctly added
    if (!username || !password || !email) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    // check if user already exists
    if (user !== null) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // check if password and confirm password matches
    if (password !== confirmPassword) {
      res.status(400).json({ msg: "Passwords do not match" });
      return;
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//! login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // check if user exists
    if (user === null) {
      return res.status(401).json({ message: "User not found!" });
    }

    //Compare passwords
    const match = await bcrypt.compare(password, user.password);
    // If password matches , generate JWT
    if (match) {
      const payload = { _id: user._id, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
      };
      res.status(200).json({ token, user: userData });
    } else {
      res.status(401).json({ message: "Wrong password" });
      return;
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

router.post("/signup", create);
router.post("/login", login);

module.exports = router;
