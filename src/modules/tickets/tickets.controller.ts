import {
  getTicketsService,
  createTicketService,
  deleteTicketService,
  getTicketByIdService,
  updateTicketByIdService,
} from "./tickets.service";

import { Response, Request, NextFunction } from "express";

import { TicketSchema, UpdateTicketSchema } from "./tickets.schema";

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

export const createTicketController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = TicketSchema.parse(req.body);
    const { id } = req.params;

    const ticket = await createTicketService(data, id);

    return res.status(200).json({
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
    const { id } = req.params;
    await deleteTicketService(id);

    return res.status(204).json({
      message: "El ticket ha sido eliminado",
    });
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
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const data = UpdateTicketSchema.parse(req.body);

    const updatedTicket = await updateTicketByIdService(userId, data);

    return res.status(200).json({
      message: "ticket actualizado con exito",
      data: updatedTicket,
    });
  } catch (error) {
    next(error);
  }
};
