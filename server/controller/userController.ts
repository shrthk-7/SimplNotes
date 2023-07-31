const jwt = require("jsonwebtoken");

import { randomBytes } from "crypto";
import catchAsyncError from "../utils/catchAsyncError";
import ApiError from "../utils/ApiError";
import prisma from "../utils/prisma";
import passwordUtils from "../utils/passwordUtils";

import { ReqWithBody } from "../types";
import { NextFunction, Response } from "express";

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

    const salt = randomBytes(8).toString("hex");
    const hashedPassword = await passwordUtils.getPasswordHash(password, salt);

    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        salt: salt,
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

    const verified = await passwordUtils.verifyPasswordHash(
      password,
      user.salt,
      user.password
    );
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
