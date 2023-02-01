const express = require("express");
const notesRouter = require("./router/notesRouter");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", notesRouter);

module.exports = app;
