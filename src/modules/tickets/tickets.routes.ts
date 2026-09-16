import { Router } from "express";

import {
  getTicketByIdController,
  createTicketController,
  deleteTicketByIdController,
  getTicketsController,
  updateTicketByIdController,
} from "./tickets.controller";

const router = Router();

router.get("/", getTicketsController);
router.post("/", createTicketController);
router.get("/:id", getTicketByIdController);
router.patch("/:id", updateTicketByIdController);
router.delete("/:id", deleteTicketByIdController);

export default router;
