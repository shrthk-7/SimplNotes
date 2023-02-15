const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const catchAsyncError = require("../utils/catchAsyncError");
const ApiError = require("../utils/ApiError");

const SALT_ROUNDS = 5;

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password))
    next(new ApiError(`both fields are required`, 400));

  const existingUser = await User.findOne({
    username: username.toLowerCase(),
  });

  if (existingUser) next(new ApiError(`username already exists`, 400));

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

  res.status(201).json({
    status: "success",
    message: "user created",
    token: token,
  });
});

exports.loginUser = catchAsyncError(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (!user) next(new ApiError("user not found"));

  const verified = await bcrypt.compare(password, user.password);
  if (!verified) next(new ApiError("user not found"));

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

  res.status(201).json({
    status: "success",
    token: token,
  });
});
