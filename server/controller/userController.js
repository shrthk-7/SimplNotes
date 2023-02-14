const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 5;

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!(username && password)) {
      throw new Error("Both fields are mandatory");
    }

    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });

    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      username: username,
      password: hashed_password,
    });

    const token = jwt.sign(
      {
        user_id: user._id,
        username: user.username,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json({
      status: "success",
      message: "user created",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error",
      error: JSON.stringify(error),
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      throw new Error("User not found");
    }

    const verified = await bcrypt.compare(password, user.password);

    if (!verified) {
      throw new Error("User not found");
    }

    const token = jwt.sign(
      {
        user_id: user._id,
        username: user.username,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json({
      status: "success",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error.msg",
    });
  }
};
