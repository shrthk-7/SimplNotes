class ApiError extends Error {
  public readonly statusCode: number;
  public readonly status: "fail" | "error";
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number | undefined) {
    super(message);

    this.statusCode = statusCode || 404;
    this.status = this.statusCode.toString().startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export type iApiError = Error & {
  statusCode: number;
  status: "fail" | "error";
  isOperational: boolean;
};

export default ApiError;
