import { Router } from "express";
// Este solo es un ejemplo de como meter las rutas

import authRoutes from "../modules/auth/auth.routes";

const router = Router();

router.use("/auth", authRoutes);

export default router;
