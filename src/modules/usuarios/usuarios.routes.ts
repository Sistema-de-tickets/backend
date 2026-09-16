import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import {
  createUserController,
  deleteUserController,
  getAreasController,
  getRolesController,
  getUserByIdController,
  getUsersController,
  updateUserController,
  updateUserStatusController,
} from "./usuarios.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", requireRole("admin", "agente"), getUsersController);
router.get("/roles", requireRole("admin", "agente"), getRolesController);
router.get("/areas", requireRole("admin", "agente"), getAreasController);
router.get("/:id", requireRole("admin", "agente"), getUserByIdController);
router.post("/", requireRole("admin"), createUserController);
router.patch("/:id", requireRole("admin"), updateUserController);
router.patch("/:id/status", requireRole("admin"), updateUserStatusController);
router.delete("/:id", requireRole("admin"), deleteUserController);

export default router;