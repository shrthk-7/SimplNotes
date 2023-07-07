const prisma = require("../utils/prisma");
const ApiError = require("../utils/ApiError");
const catchAsyncError = require("../utils/catchAsyncError");

exports.getAllNotes = catchAsyncError(async (req, res, next) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.user.id,
    },
    include: {
      notes: true,
    },
  });

  res.json({
    status: "success",
    notes: user.notes,
  });
});
exports.postNote = catchAsyncError(async (req, res, next) => {
  const newNote = await prisma.note.create({
    data: {
      heading: req.body.heading,
      body: req.body.body,
      User: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });

  res.status(201).json({
    status: "success",
    message: "Note created successfully",
    note: newNote,
  });
});
exports.updateNote = catchAsyncError(async (req, res, next) => {
  const note_id = req.params.id;

  const { heading, body, backgroundColor, color } = req.body;
  const updatedNote = await prisma.note.update({
    where: {
      id: note_id,
    },
    data: {
      heading: heading,
      body: body,
      backgroundColor: backgroundColor,
      color: color,
    },
  });
  res.status(200).json({
    status: "success",
    message: "Note updated successfully",
    note: updatedNote,
  });
});
exports.deleteNote = catchAsyncError(async (req, res, next) => {
  const note_id = req.params.id;
  const note = await prisma.note.findFirst({
    where: {
      id: note_id,
    },
    include: {
      User: true,
    },
  });

  if (!note || note.User.id != req.user.id) {
    return next(new ApiError("No such post found"));
  }

  await prisma.note.delete({
    where: {
      id: note_id,
    },
  });

  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      notes: {
        disconnect: {
          id: note_id,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    message: `Note deleted successfully`,
  });
});
exports.getNote = catchAsyncError(async (req, res, next) => {
  const note_id = req.params.id;

  const note = await prisma.note.findFirst({
    where: {
      id: note_id,
    },
    include: {
      User: true,
    },
  });

  if (!note || note.User.id != req.user.id) {
    return next(
      new ApiError(`note with requested id : ${note_id} not found`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    note: note,
  });
});
