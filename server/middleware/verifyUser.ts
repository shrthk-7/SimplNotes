import { Response, NextFunction } from "express";
import { ReqWithCred } from "../types";
import ApiError from "../utils/ApiError";
const jwt = require("jsonwebtoken");

const verifyUser = (req: ReqWithCred, res: Response, next: NextFunction) => {
  try {
    const jwt_token = req.headers["x-access-token"];
    if (!jwt_token) {
      return next(new ApiError("no access token found", 401));
    }

    const user: { username: string; id: string } = jwt.verify(
      jwt_token,
      process.env.TOKEN_KEY
    );
    req.user = user;
    next();
  } catch (err: any) {
    return next(
      new ApiError(`auth token verification failed: ${err.message}`, 401)
    );
  }
};

export default verifyUser;
module.exports = verifyUser;
