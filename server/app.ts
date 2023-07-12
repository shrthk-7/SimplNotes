require("dotenv").config("./.env");

import express, { Express, Request, Response, NextFunction } from "express";

import notesRouter from "./router/notesRouter";
import userRouter from "./router/userRouter";
import globalErrorHandler from "./utils/globalErrorHandler";
import ApiError from "./utils/ApiError";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} : ${req.path}`);
  next();
});

app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`${req.originalUrl} not found on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
