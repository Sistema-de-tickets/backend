import { Prisma } from "@prisma/client";

export const ticketInclude = {
  areas: { select: { id: true, name: true } },
  categories: { select: { id: true, name: true } },
  users_tickets_created_byTousers: {
    select: { id: true, primer_nombre: true, apellido_paterno: true },
  },
  users_tickets_assigned_toTousers: {
    select: { id: true, primer_nombre: true, apellido_paterno: true },
  },
} satisfies Prisma.ticketsInclude;

export type TicketWithRelations = Prisma.ticketsGetPayload<{
  include: typeof ticketInclude;
}>;
