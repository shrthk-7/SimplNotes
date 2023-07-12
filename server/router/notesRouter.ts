import { Router } from "express";
import notesController from "../controller/notesController";
import verifyUser from "../middleware/verifyUser";

const router = Router();
router
  .route("/")
  .get(verifyUser, notesController.getAllNotes)
  .post(verifyUser, notesController.postNote);

router
  .route("/:id")
  .get(verifyUser, notesController.getNote)
  .patch(verifyUser, notesController.updateNote)
  .delete(verifyUser, notesController.deleteNote);

export default router;
