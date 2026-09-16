import { z } from "zod";

const userProfileFields = {
  primer_nombre: z.string().trim().min(1, "El primer nombre es requerido"),
  segundo_nombre: z.string().trim().optional(),
  apellido_paterno: z
    .string()
    .trim()
    .min(1, "El apellido paterno es requerido"),
  apellido_materno: z.string().trim().optional(),
  role_id: z.string().uuid("Rol inválido"),
  area_id: z.string().uuid("Área inválida"),
};

export const createUserSchema = z.object({
  ...userProfileFields,
  email: z.string().trim().email("Correo inválido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z
  .object(userProfileFields)
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "Debes proporcionar al menos una propiedad para actualizar",
  );

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const updateStatusSchema = z.object({
  status: z.enum(["activo", "inactivo"]),
});

export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;