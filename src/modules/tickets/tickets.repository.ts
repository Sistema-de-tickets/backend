import {
  CreateTicketInput,
  PriorityInput,
  statusInput,
  UpdateTicketInput,
} from "./tickets.schema";
import { ticketInclude } from "./tickets.types";

import { prisma } from "../../config/prisma";

export const getTicketsRepository = async () => {
  return prisma.tickets.findMany({
    include: ticketInclude,
    orderBy: {
      created_at: "desc",
    },
  });
};

export const getTicketByIdRepository = async (id: string) => {
  return prisma.tickets.findUnique({
    where: {
      id,
    },
    include: ticketInclude,
  });
};

export const findAllCategories = async () => {
  return prisma.categories.findMany({ orderBy: { name: "asc" } });
};

// Reglas de negocio a investigar:
// ¿La categoría pertenece al área seleccionada?
export const createTicketRepository = async (
  data: CreateTicketInput,
  userId: string,
) => {
  return prisma.tickets.create({
    data: {
      created_by: userId,
      area_id: data.area_id,
      category_id: data.category_id,
      title: data.title,
      description: data.description,
      priority: data.priority,
    },
    include: ticketInclude,
  });
};

export const updateTicketByIdRepository = async (
  id: string,
  data: UpdateTicketInput,
) => {
  return prisma.tickets.update({
    where: {
      id,
    },
    data,
    include: ticketInclude,
  });
};

export const updateTicketPriorityRepository = async (
  id: string,
  priority: PriorityInput["priority"],
) => {
  return prisma.tickets.update({
    where: { id },
    data: { priority },
    include: ticketInclude,
  });
};

export const updateTicketStatusRepository = async (
  id: string,
  status: statusInput["status"],
) => {
  return prisma.tickets.update({
    where: { id },
    data: {
      status,
      resolved_at: status === "resuelto" ? new Date() : null,
    },
    include: ticketInclude,
  });
};

export const assignTicketRepository = async (
  id: string,
  assignedTo: string,
) => {
  return prisma.tickets.update({
    where: { id },
    data: { assigned_to: assignedTo },
    include: ticketInclude,
  });
};

export const deleteTicketByIdRepository = async (id: string) => {
  return prisma.tickets.delete({
    where: {
      id,
    },
  });
};
