const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

let notes = JSON.parse(fs.readFileSync("./notes.json", "utf-8"));

app.get("/api", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

app.post("/api", (req, res) => {
  console.log(req.body);
  const newNote = {
    id: uuid.v4(),
    heading: req.body.content.heading || "Heading " + notes.length,
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

app.patch("/api", (req, res) => {
  const updatedNote = req.body.content;
  const updatedNoteIndex = notes.findIndex(
    (note) => note.id === updatedNote.id
  );
  if (updatedNoteIndex !== -1) {
    notes[updatedNoteIndex] = { ...updatedNote };
  }
  fs.writeFile("./notes.json", JSON.stringify(notes), (err) => {
    if (err) {
      res.json({
        message: "fail",
        error: err,
      });
    } else {
      res.json({
        message: "success",
        updatedNote: updatedNote,
      });
    }
  });
});

app.delete("/api", (req, res) => {
  console.log(req.body);
});

module.exports = app;
