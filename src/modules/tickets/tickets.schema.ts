import { z } from "zod";

/**
 * Schema utilizado para validar la creación de un ticket.
 *
 */

const priorityEnum = z.enum(["baja", "media", "alta", "critica"]);

export const TicketSchema = z.object({
  area_id: z.uuid(),
  category_id: z.uuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  priority: priorityEnum,
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

// Edición general del ticket (title/description/category/area). La prioridad,
// el estado y la asignación son acciones administrativas independientes y
// tienen su propio schema/endpoint.
export const UpdateTicketSchema = z
  .object({
    area_id: z.uuid(),
    category_id: z.uuid(),
    title: z.string().min(1).max(200),
    description: z.string().min(1),
  })
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "Debes proporcionar al menos una propiedad para actualizar",
  );

export const PrioritySchema = z.object({
  priority: priorityEnum,
});

export const AssignSchema = z.object({
  assigned_to: z.uuid(),
});

export type CreateTicketInput = z.infer<typeof TicketSchema>;
export type UpdateTicketInput = z.infer<typeof UpdateTicketSchema>;
export type statusInput = z.infer<typeof StatusSchema>;
export type PriorityInput = z.infer<typeof PrioritySchema>;
export type AssignInput = z.infer<typeof AssignSchema>;
