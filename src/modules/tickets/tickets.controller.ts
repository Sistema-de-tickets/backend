import {
  getTicketsService,
  createTicketService,
  deleteTicketService,
  getCategoriesService,
  getTicketByIdService,
  updateTicketByIdService,
  updateTicketPriorityService,
  updateTicketStatusService,
  assignTicketService,
} from "./tickets.service";

import { Response, Request, NextFunction } from "express";
import CustomError from "../../errors/CustomError";

import {
  TicketSchema,
  UpdateTicketSchema,
  PrioritySchema,
  StatusSchema,
  AssignSchema,
} from "./tickets.schema";

const requireAuthenticatedUser = (req: Request) => {
  if (!req.user) {
    throw new CustomError(401, "Usuario no autenticado");
  }

  return { id: req.user.id, role: req.user.role };
};

export const getTicketsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tickets = await getTicketsService();

    return res.status(200).json({
      message: "Tickets obtenidos satisfactoriamente",
      data: tickets,
    });
  } catch (error) {
    return next(error);
  }
};

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await getCategoriesService();

    return res.status(200).json({
      message: "Categorías obtenidas satisfactoriamente",
      data: categories,
    });
  } catch (error) {
    return next(error);
  }
};

export const createTicketController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const actor = requireAuthenticatedUser(req);
    const data = TicketSchema.parse(req.body);

    const ticket = await createTicketService(data, actor);

    return res.status(201).json({
      message: "Ticket creado con exito",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTicketByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const actor = requireAuthenticatedUser(req);
    const { id } = req.params;

    await deleteTicketService(id, actor);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getTicketByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const ticket = await getTicketByIdService(id);

    return res.status(200).json({
      message: "Se obtuvo el ticket con exito",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTicketByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const actor = requireAuthenticatedUser(req);
    const { id } = req.params;
    const data = UpdateTicketSchema.parse(req.body);

    const updatedTicket = await updateTicketByIdService(id, data, actor);

    return res.status(200).json({
      message: "ticket actualizado con exito",
      data: updatedTicket,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTicketPriorityController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const actor = requireAuthenticatedUser(req);
    const { id } = req.params;
    const { priority } = PrioritySchema.parse(req.body);

    const updatedTicket = await updateTicketPriorityService(
      id,
      priority,
      actor,
    );

    return res.status(200).json({
      message: "Prioridad del ticket actualizada con exito",
      data: updatedTicket,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTicketStatusController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const actor = requireAuthenticatedUser(req);
    const { id } = req.params;
    const { status } = StatusSchema.parse(req.body);

    const updatedTicket = await updateTicketStatusService(id, status, actor);

    return res.status(200).json({
      message: "Estado del ticket actualizado con exito",
      data: updatedTicket,
    });
  } catch (error) {
    next(error);
  }
};

export const assignTicketController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const actor = requireAuthenticatedUser(req);
    const { id } = req.params;
    const { assigned_to } = AssignSchema.parse(req.body);

    const updatedTicket = await assignTicketService(id, assigned_to, actor);

    return res.status(200).json({
      message: "Ticket asignado con exito",
      data: updatedTicket,
    });
  } catch (error) {
    next(error);
  }
};
