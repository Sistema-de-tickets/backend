import { Router } from "express";
import usuariosRouter from "../modules/usuarios/usuarios.routes";
import authRouter from "../modules/auth/auth.routes";
import ticketsRouter from "../modules/tickets/tickets.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usuariosRouter);
router.use("/tickets", ticketsRouter);

export default router;