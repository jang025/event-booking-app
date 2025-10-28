const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const create = async (req, res) => {
  const { username, password, age } = req.body;

  const user = await User.findOne({ username });
  if (user !== null) {
    res.status(409).json({ message: "Username already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      bookings,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user === null) {
    return res.status(401).json({ message: "User not found!" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const payload = { _id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ msg: "Wrong password" });
  }
};

router.post("/signup", create);
router.post("/login", login);

module.exports = router;
