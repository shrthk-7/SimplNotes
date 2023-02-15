const Note = require("../models/noteModel");
const User = require("../models/userModel");

const ApiError = require("../utils/ApiError");
const catchAsyncError = require("../utils/catchAsyncError");

exports.getAllNotes = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.user_id).populate("notes");

  res.json({
    status: "success",
    notes: user.notes,
  });
});
exports.postNote = catchAsyncError(async (req, res, next) => {
  const newNote = await Note.create(req.body);
  await User.findByIdAndUpdate(
    req.user.user_id,
    {
      $push: {
        notes: newNote._id,
      },
    },
    { new: true, useFindAndModify: false }
  );

  res.status(201).json({
    status: "success",
    note: newNote,
  });
});
exports.updateNote = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const note = await Note.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    note: note,
  });
});
exports.deleteNote = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const deletedNote = await Note.findByIdAndDelete(id);
  if (!deletedNote)
    return next(new ApiError(`couldnot find note with id ${id}`, 401));

  res.status(204).json({
    status: "success",
    message: "successfully deleted",
  });
});
exports.getNote = catchAsyncError(async (req, res, next) => {
  const searchId = req.params.id;
  const foundNote = Note.findById(searchId);
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
