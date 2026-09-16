import { z } from "zod";

/**
 * Schema utilizado para validar la creación de un ticket.
 *
 */

export const TicketSchema = z.object({
  area_id: z.uuid(),
  category_id: z.uuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  priority: z.enum(["baja", "media", "alta", "critica"]),
});

export const StatusSchema = z.object({
  status: z.enum([
    "abierto",
    "en_progreso",
    "resuelto",
    "cerrado",
    "cancelado",
  ]),
});

export const UpdateTicketSchema = TicketSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  "Debes proporcionar al menos una propiedad para actualizar",
);

export type CreateTicketInput = z.infer<typeof TicketSchema>;
export type UpdateTicketInput = z.infer<typeof UpdateTicketSchema>;
export type statusInput = z.infer<typeof StatusSchema>;
