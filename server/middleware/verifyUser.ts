import { Response, NextFunction } from "express";
import { ReqWithBody, UserPayload } from "../types";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";

const verifyUser = (req: ReqWithBody, res: Response, next: NextFunction) => {
  try {
    const jwt_token = req.headers["x-access-token"];
    if (!jwt_token || typeof jwt_token !== "string") {
      return next(new ApiError("No access token found", 401));
    }

    if (!process.env.TOKEN_KEY) {
      return next(new ApiError("No token key found", 500));
    }

    const user = jwt.verify(jwt_token, process.env.TOKEN_KEY) as UserPayload;
    req.user = user;
    next();
  } catch (err: any) {
    return next(
      new ApiError(`Auth token verification failed: ${err.message}`, 401)
    );
  }
};

export default verifyUser;
