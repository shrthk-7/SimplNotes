require("dotenv").config("./.env");
const express = require("express");
const notesRouter = require("./router/notesRouter");
const userRouter = require("./router/userRouter");

const globalErrorHandler = require("./utils/globalErrorHandler");
const ApiError = require("./utils/ApiError");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log(`Path: ${req.path}, Method: ${req.method}`);
  next();
});

app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);

app.all("*", (req, res, next) => {
  next(new ApiError(`${req.originalUrl} not found on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
