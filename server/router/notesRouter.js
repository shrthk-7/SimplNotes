const express = require("express");
const notesController = require("../controller/notesController");

const router = express.Router();
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
