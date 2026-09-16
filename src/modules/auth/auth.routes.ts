import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getMeController } from "./auth.controller";

const router = Router();

router.get("/me", authMiddleware, getMeController);

export default router;