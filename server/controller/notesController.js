const Note = require("../models/noteModel");

const ApiError = require("../utils/ApiError");
const catchAsyncError = require("../utils/catchAsyncError");

exports.getAllNotes = catchAsyncError(async (req, res, next) => {
  const notes = await Note.getAllNotesOfUser(req.user.user_id);

  res.json({
    status: "success",
    notes: notes,
  });
});

exports.postNote = catchAsyncError(async (req, res, next) => {
  const { heading, body } = req.body;
  if (!heading || !body) {
    return next(new ApiError("Incomplete data"));
  }

  const newNote = await Note.create({
    heading,
    body,
    user_id: req.user.user_id,
  });

  res.status(201).json({
    status: "success",
    note: newNote,
  });
});

exports.updateNote = catchAsyncError(async (req, res, next) => {
  const note = await Note.update({
    user_id: req.user.user_id,
    note_id: req.params.id,
    ...req.body,
  });

  res.status(200).json({
    status: "success",
    note: note,
  });
});

exports.deleteNote = catchAsyncError(async (req, res, next) => {
  const note_id = req.params.id;
  await Note.remove({ note_id, user_id: req.user.user_id });

  res.status(200).json({
    status: "success",
    message: `note with id: ${note_id} deleted successfully`,
  });
});

exports.getNote = catchAsyncError(async (req, res, next) => {
  const searchId = req.params.id;
  const foundNote = Note.find({
    note_id: searchId,
    user_id: req.user.user_id,
  });
  if (!foundNote) {
    return next(
      new ApiError(`note with requested id : ${searchId} not found`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    note: foundNote,
  });
});
