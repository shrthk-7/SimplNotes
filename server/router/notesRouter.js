const express = require("express");
const router = express.Router();
const notesController = require("../controller/notesController");

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.postNote);

router
  .route("/:id")
  .get(notesController.getNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

module.exports = router;
