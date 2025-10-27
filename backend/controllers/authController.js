const express = require("express");
const router = express.Router();
const User = require("../models/User");

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user === null) {
    return res.status(401).json({ msg: "No user" });
  }
};

router.post("/login", login);

module.exports = router;
