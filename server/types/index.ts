import e, { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

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

export interface UserPayload extends JwtPayload {
  username: string;
  id: string;
}
