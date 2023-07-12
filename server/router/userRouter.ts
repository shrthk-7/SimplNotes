import { Router } from "express";
import userController from "../controller/userController";

const router = Router();
router.route("/signup").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

export default router;
