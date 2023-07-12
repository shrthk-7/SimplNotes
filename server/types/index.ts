import { Request, Response, NextFunction } from "express";

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface ReqWithBody extends Request {
  body: {
    username?: string;
    password?: string;
    heading?: string;
    body?: string;
    backgroundColor?: string;
    color?: string;
  };
  user?: {
    username: string;
    id: string;
  };
}
