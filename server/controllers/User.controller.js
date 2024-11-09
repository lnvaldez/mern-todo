const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await User.register(username, email, password);

    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
