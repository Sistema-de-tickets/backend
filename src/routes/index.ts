import { Router } from "express";
import usuariosRouter from "../modules/usuarios/usuarios.routes";
import authRouter from "../modules/auth/auth.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usuariosRouter);

export default router;