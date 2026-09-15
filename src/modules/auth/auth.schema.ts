import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8), // creo que esto esta mal
  primer_nombre: z.string().max(200),
  segundo_nombre: z.string().max(200).optional(),
  apellido_paterno: z.string().max(200),
  apellido_materno: z.string().max(200).optional(),
  role_id: z.string().uuid(),
  area_id: z.string().uuid(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8), // creo que esta mal
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type AuthInput = z.infer<typeof authSchema>;
export type AuthLogin = z.infer<typeof loginSchema>;
export type resetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type forgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
