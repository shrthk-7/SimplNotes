const mongoose = require("mongoose");
const Note = require("./noteModel");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be empty"],
    maxlength: [60, "Username must be shorter than 60 characters"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
  },
  notes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Note",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
