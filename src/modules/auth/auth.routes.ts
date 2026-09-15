import { Router } from "express";
import { AuthController } from "./auth.controller";
const router = Router();
const authController = new AuthController();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/me", authController.getCurrentUser);


export default router;