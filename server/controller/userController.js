const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 2;

exports.createNewUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

    await User.create({
      username: username,
      password: hashed_password,
    });

    res.status(201).json({
      status: "success",
      message: "user created",
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      throw "user not found";
    }

    const verified = await bcrypt.compare(password, user.password);

    if (!verified) {
      throw "user not found";
    }

    res.status(201).json({
      status: "success",
      message: "logged in",
    });
  } catch (error) {
    res.status(404).json({
      message: "user not found",
    });
  }
};
