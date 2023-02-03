const Note = require("../models/noteModel");

exports.getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.json({
    notes: notes,
  });
};
exports.postNote = async (req, res) => {
  try {
    const newNote = await Note.create(req.body.content);
    res.status(201).json({
      status: "success",
      note: newNote,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};
exports.updateNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Note.findByIdAndUpdate(id, req.body.note, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      note: note,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "fail",
      error: "Validation failed, check note content",
    });
  }
};
exports.deleteNote = async (req, res) => {
  const id = req.params.id;
  const deletedNote = await Note.findByIdAndDelete(id);
  if (!deletedNote) {
    return res.status(404).json({
      status: "fail",
      message: "could delete item with the provided id",
    });
  }
  res.status(204).json({
    status: "success",
    message: "successfully deleted",
  });
};
exports.getNote = (req, res) => {
  const searchId = req.params.id;
  const foundNote = Note.findById(searchId);
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
