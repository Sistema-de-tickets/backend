import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

import {
  getTicketByIdController,
  createTicketController,
  deleteTicketByIdController,
  getCategoriesController,
  getTicketsController,
  updateTicketByIdController,
  updateTicketPriorityController,
  updateTicketStatusController,
  assignTicketController,
} from "./tickets.controller";

const router = Router();

router.use(authMiddleware);

// Ver y crear: usuario y admin.
router.get("/", requireRole("admin", "usuario"), getTicketsController);
// Debe ir antes de "/:id" para que Express no interprete "categories" como un id.
router.get(
  "/categories",
  requireRole("admin", "usuario"),
  getCategoriesController,
);
router.get("/:id", requireRole("admin", "usuario"), getTicketByIdController);
router.post("/", requireRole("admin", "usuario"), createTicketController);

// Edición general: usuario (solo su propio ticket, mientras esté "abierto")
// o admin (mientras no esté cerrado/cancelado) — validado en el service.
router.patch(
  "/:id",
  requireRole("admin", "usuario"),
  updateTicketByIdController,
);

// Acciones administrativas: solo admin.
router.patch(
  "/:id/priority",
  requireRole("admin"),
  updateTicketPriorityController,
);
router.patch("/:id/status", requireRole("admin"), updateTicketStatusController);
router.patch("/:id/assign", requireRole("admin"), assignTicketController);
router.delete("/:id", requireRole("admin"), deleteTicketByIdController);

export default router;
