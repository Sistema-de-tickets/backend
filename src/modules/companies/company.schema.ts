import { z } from "zod";

/**
 * Schema utilizado para validar la creación de una empresa.
 *
 * El nombre es obligatorio; los demás campos son opcionales.
 */

export const companySchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido"),
  website: z.string().url().optional(),
  industry: z.string().optional(),
  description: z.string().optional(),
});

export type CreateCompanyInput = z.infer<typeof companySchema>;

/**
 * Schema utilizado para actualizaciones parciales.
 *
 * Todos los campos son opcionales, pero se requiere proporcionar
 * al menos una propiedad para evitar un PATCH con un objeto vacío.
 */

export const UpdateCompanySchema = companySchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "Debes proporcionar al menos una propiedad para actualizar",
  );
export type UpdateCompanyInput = z.infer<typeof UpdateCompanySchema>;
