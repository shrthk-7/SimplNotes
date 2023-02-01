const express = require("express");
const router = express.Router();
const notesController = require("../controller/notesController");

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.postNote)
  .patch(notesController.updateNote);

router
  .route("/:id")
  .get(notesController.getNote)
  .delete(notesController.deleteNote);

module.exports = router;
