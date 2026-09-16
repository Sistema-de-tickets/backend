import { CreateTicketInput, UpdateTicketInput } from "./tickets.schema";

import { prisma } from "../../config/prisma";

export const getTicketsRepository = async () => {
  return prisma.tickets.findMany({
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
  });
};

// Reglas de negocio a investigar:
// ¿Un usuario puede crear tickets?
// ¿La categoría pertenece al área seleccionada?
// ¿Cómo se genera el code único del ticket?
// ¿Quién puede asignar el ticket posteriormente?
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
  });
};

export const deleteTicketByIdRepository = async (id: string) => {
  return prisma.tickets.delete({
    where: {
      id,
    },
  });
};
