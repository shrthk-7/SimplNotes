const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const notes = JSON.parse(fs.readFileSync("./notes.json", "utf-8"));

app.get("/api", (req, res) => {
  res.status(200).json({
    notes: notes.notes,
  });
});

app.post("/api", (req, res) => {
  console.log(req.body);
  notes.notes.unshift(req.body.content);
  const newNotes = JSON.stringify(notes);
  fs.writeFile("./notes.json", newNotes, (err) => {
    if (err) {
      res.status(500).json({
        message: "Error while saving contents",
      });
    } else {
      res.status(500).json({
        message: "Received",
      });
    }
  });
});

module.exports = app;
