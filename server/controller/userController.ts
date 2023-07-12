const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import catchAsyncError from "../utils/catchAsyncError";
import ApiError from "../utils/ApiError";
import prisma from "../utils/prisma";

import { ReqWithBody } from "../types";
import { NextFunction, Response } from "express";

const SALT_ROUNDS = 5;

const registerUser = catchAsyncError(
  async (req: ReqWithBody, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password)
      return next(new ApiError(`both fields are required`, 400));

    const existingUser = await prisma.user.findFirst({
      where: {
        username: username.toLowerCase(),
      },
    });
    if (existingUser) return next(new ApiError(`username already exists`, 400));

    const hashed_password: string = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashed_password,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
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
  }
);

const loginUser = catchAsyncError(
  async (req: ReqWithBody, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!(username && password))
      return next(new ApiError(`both fields are required`, 400));

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) return next(new ApiError("user not found", 401));

    const verified = await bcrypt.compare(password, user.password);
    if (!verified) return next(new ApiError("user not found", 401));

    const token = jwt.sign(
      {
        id: user.id,
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
  }
);

export default {
  registerUser,
  loginUser,
};
