import CustomError from "../../errors/CustomError";
import {
  getTicketsRepository,
  createTicketRepository,
  deleteTicketByIdRepository,
  getTicketByIdRepository,
  updateTicketByIdRepository,
} from "./tickets.repository";

import { CreateTicketInput, UpdateTicketInput } from "./tickets.schema";

export const getTicketsService = async () => {
  return getTicketsRepository();
};

export const createTicketService = async (
  data: CreateTicketInput,
  userId: string,
) => {
  if (!userId) {
    throw new CustomError(401, "No existe ese id");
  }

  return createTicketRepository(data, userId);
};

export const deleteTicketService = async (userId: string) => {
  if (!userId) {
    throw new CustomError(401, "No existe ese ID");
  }

  return deleteTicketByIdRepository(userId);
};

export const getTicketByIdService = async (userId: string) => {
  if (!userId) {
    throw new CustomError(401, "No existe ese ID");
  }

  return getTicketByIdRepository(userId);
};

export const updateTicketByIdService = async (
  userId: string,
  data: UpdateTicketInput,
) => {
  if (!userId) {
    throw new CustomError(401, "No existe ese id");
  }

  return updateTicketByIdRepository(userId, data);
};
