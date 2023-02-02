const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, "A note must have a heading"],
    maxlength: [128, "Heading must be shorter than 128 letters"],
  },
  body: {
    type: String,
    required: [true, "A note must have a body"],
  },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
