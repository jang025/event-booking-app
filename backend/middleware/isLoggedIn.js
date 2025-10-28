const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ msg: "you cannot enter", error });
  }
};

module.exports = { isLoggedIn };
