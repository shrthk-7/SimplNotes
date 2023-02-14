const express = require("express");
const notesController = require("../controller/notesController");
const verifyUser = require("../middleware/verifyUser");

const router = express.Router();
router
  .route("/")
  .get(verifyUser, notesController.getAllNotes)
  .post(verifyUser, notesController.postNote);

router
  .route("/:id")
  .get(verifyUser, notesController.getNote)
  .patch(verifyUser, notesController.updateNote)
  .delete(verifyUser, notesController.deleteNote);

module.exports = router;
