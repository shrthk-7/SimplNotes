import { Request, Response, NextFunction } from "express";

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type ReqWithCred = Request & {
  body: {
    username?: string;
    password?: string;
  };
  user?: {
    username: string;
    id: string;
  };
};
