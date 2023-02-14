require("dotenv").config("./.env");
const express = require("express");
const notesRouter = require("./router/notesRouter");
const userRouter = require("./router/userRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log("Path: " + req.path);
  next();
});

app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);

module.exports = app;
