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
  backgroundColor: {
    type: String,
    default: "var(--teal-950)",
  },
  color: {
    type: String,
    default: "var(--teal-50)",
  },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
