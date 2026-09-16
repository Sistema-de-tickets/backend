import CustomError from "../../errors/CustomError";
import {
  getTicketsRepository,
  createTicketRepository,
  deleteTicketByIdRepository,
  findAllCategories,
  getTicketByIdRepository,
  updateTicketByIdRepository,
  updateTicketPriorityRepository,
  updateTicketStatusRepository,
  assignTicketRepository,
} from "./tickets.repository";
import { findUserById } from "../usuarios/usuarios.repository";

import {
  AssignInput,
  CreateTicketInput,
  PriorityInput,
  statusInput,
  UpdateTicketInput,
} from "./tickets.schema";

type Actor = { id: string; role?: string };

// Solo admin y usuario existen hoy; cuando se agreguen más roles (soporte,
// supervisor, etc.) este es el único lugar que hay que tocar.
const CREATOR_ROLES = ["admin", "usuario"];
const CLOSED_STATUSES = ["cerrado", "cancelado"];

const ensureAdmin = (actor: Actor, message: string) => {
  if (actor.role !== "admin") {
    throw new CustomError(403, message);
  }
};

export const getTicketsService = async () => {
  return getTicketsRepository();
};

export const getCategoriesService = async () => {
  return findAllCategories();
};

export const getTicketByIdService = async (id: string) => {
  if (!id) {
    throw new CustomError(401, "No existe ese ID");
  }

  const ticket = await getTicketByIdRepository(id);

  if (!ticket) {
    throw new CustomError(404, `El ticket con id ${id} no existe`);
  }

  return ticket;
};

export const createTicketService = async (
  data: CreateTicketInput,
  actor: Actor,
) => {
  if (!actor.id) {
    throw new CustomError(401, "No existe ese id");
  }

  if (!actor.role || !CREATOR_ROLES.includes(actor.role)) {
    throw new CustomError(403, "No tienes permisos para crear tickets");
  }

  return createTicketRepository(data, actor.id);
};

// Edición general (title/description/category/area): el creador solo mientras
// el ticket sigue "abierto"; el admin en cualquier momento salvo que ya esté
// cerrado o cancelado. Prioridad, estado y asignación son acciones aparte.
export const updateTicketByIdService = async (
  ticketId: string,
  data: UpdateTicketInput,
  actor: Actor,
) => {
  const ticket = await getTicketByIdService(ticketId);

  if (CLOSED_STATUSES.includes(ticket.status)) {
    throw new CustomError(
      403,
      "No se puede editar un ticket cerrado o cancelado",
    );
  }

  if (actor.role === "usuario") {
    if (ticket.created_by !== actor.id) {
      throw new CustomError(403, "No puedes editar un ticket que no creaste");
    }

    if (ticket.status !== "abierto") {
      throw new CustomError(
        403,
        "Solo puedes editar el ticket mientras está abierto",
      );
    }
  } else if (actor.role !== "admin") {
    throw new CustomError(403, "No tienes permisos para editar este ticket");
  }

  return updateTicketByIdRepository(ticketId, data);
};

export const updateTicketPriorityService = async (
  ticketId: string,
  priority: PriorityInput["priority"],
  actor: Actor,
) => {
  ensureAdmin(
    actor,
    "Solo un administrador puede cambiar la prioridad del ticket",
  );

  await getTicketByIdService(ticketId);

  return updateTicketPriorityRepository(ticketId, priority);
};

export const updateTicketStatusService = async (
  ticketId: string,
  status: statusInput["status"],
  actor: Actor,
) => {
  ensureAdmin(actor, "Solo un administrador puede cambiar el estado del ticket");

  await getTicketByIdService(ticketId);

  return updateTicketStatusRepository(ticketId, status);
};

export const assignTicketService = async (
  ticketId: string,
  assignedTo: AssignInput["assigned_to"],
  actor: Actor,
) => {
  ensureAdmin(actor, "Solo un administrador puede asignar tickets");

  await getTicketByIdService(ticketId);

  const assignee = await findUserById(assignedTo);

  if (!assignee) {
    throw new CustomError(404, `El usuario con id ${assignedTo} no existe`);
  }

  return assignTicketRepository(ticketId, assignedTo);
};

export const deleteTicketService = async (ticketId: string, actor: Actor) => {
  ensureAdmin(actor, "Solo un administrador puede eliminar tickets");

  await getTicketByIdService(ticketId);

  return deleteTicketByIdRepository(ticketId);
};
