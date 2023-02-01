const fs = require("fs");
const uuid = require("uuid");
const notesPath = `${__dirname}/../notes.json`;

let notes = JSON.parse(fs.readFileSync(notesPath, "utf-8"));

// body dependent
exports.getAllNotes = (req, res) => {
  res.json({
    notes: notes,
  });
};
exports.postNote = (req, res) => {
  const newNote = {
    id: uuid.v4(),
    heading: req.body.content.heading || "Heading " + notes.length,
    body: req.body.content.body || "<Empty Body>",
  };
  notes.unshift(newNote);

  fs.writeFile(notesPath, JSON.stringify(notes), (err) => {
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
};
exports.updateNote = (req, res) => {
  const updatedNote = req.body.content;
  const updatedNoteIndex = notes.findIndex(
    (note) => note.id === updatedNote.id
  );
  if (updatedNoteIndex !== -1) {
    notes[updatedNoteIndex] = { ...updatedNote };
  }
  fs.writeFile(notesPath, JSON.stringify(notes), (err) => {
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
};

// param dependent
exports.deleteNote = (req, res) => {
  console.log(req.params.id);
};
exports.getNote = (req, res) => {
  const searchId = req.params.id;
  const foundNote = notes.find((note) => note.id === searchId);
  if (foundNote) {
    res.status(200).json({
      status: "success",
      note: foundNote,
    });
  } else {
    res.status(404).json({
      status: "fail",
    });
  }
};
