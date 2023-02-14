require("dotenv").config("./.env");
const express = require("express");
const notesRouter = require("./router/notesRouter");
const userRouter = require("./router/userRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", notesRouter);
app.use("/api/user", userRouter);

module.exports = app;
