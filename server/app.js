const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const notes = JSON.parse(fs.readFileSync("./notes.json", "utf-8"));
app.get("/api", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

app.post("/api", (req, res) => {
  console.log(req.body);
  const newNote = {
    heading: req.body.content.heading || "<Empty Heading>",
    body: req.body.content.body || "<Empty Body>",
  };
  notes.unshift(newNote);

  fs.writeFile("./notes.json", JSON.stringify(notes), (err) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message: "Error while saving contents",
      });
    } else {
      res.status(200).json({
        status: "success",
        note: newNote,
      });
    }
  });
});

module.exports = app;
