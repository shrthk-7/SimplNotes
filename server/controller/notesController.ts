import prisma from "../utils/prisma";
import ApiError from "../utils/ApiError";
import catchAsyncError from "../utils/catchAsyncError";

import { ReqWithBody } from "../types";
import { NextFunction, Response } from "express";

const getAllNotes = catchAsyncError(
  async (req: ReqWithBody, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) return;

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
      notes: user?.notes,
    });
  }
);
const postNote = catchAsyncError(
  async (req: ReqWithBody, res: Response, next: NextFunction) => {
    if (!req.user || !req.body.heading || !req.body.body) return;

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
  }
);
const updateNote = catchAsyncError(
  async (req: ReqWithBody, res: Response, next: NextFunction) => {
    const { heading, body, backgroundColor, color } = req.body;

    const updatedNote = await prisma.note.update({
      where: {
        id: req.params.id,
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
  }
);
const deleteNote = catchAsyncError(
  async (req: ReqWithBody, res: Response, next: NextFunction) => {
    const note = await prisma.note.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        User: true,
      },
    });

    if (!note || !note.User || note.User.id !== req.user?.id) {
      return next(new ApiError("No such post found", 404));
    }

    await prisma.note.delete({
      where: {
        id: req.params.id,
      },
    });

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        notes: {
          disconnect: {
            id: req.params.id,
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      message: `Note deleted successfully`,
    });
  }
);
const getNote = catchAsyncError(
  async (req: ReqWithBody, res: Response, next: NextFunction) => {
    const note = await prisma.note.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        User: true,
      },
    });

    if (!note || !note.User || note.User.id !== req.user?.id) {
      return next(
        new ApiError(`note with requested id : ${req.params.id} not found`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      note: note,
    });
  }
);

export default {
  getAllNotes,
  postNote,
  updateNote,
  deleteNote,
  getNote,
};
