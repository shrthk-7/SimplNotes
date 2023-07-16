import { NextFunction, Request, Response } from "express";
import { AsyncRequestHandler } from "../types";

const catchAsyncError = (fn: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      console.log(err);
      next(err);
    });
  };
};

export default catchAsyncError;
