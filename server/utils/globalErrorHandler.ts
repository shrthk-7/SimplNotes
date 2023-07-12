import { Request, Response, NextFunction } from "express";
import ApiError, { iApiError } from "./ApiError";

const globalErrorHandler = (
  err: Error | iApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let status = "error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    status = err.status;
  }

  res.status(statusCode).json({
    status: status,
    message: err.message,
  });
};

export default globalErrorHandler;
module.exports = globalErrorHandler;
