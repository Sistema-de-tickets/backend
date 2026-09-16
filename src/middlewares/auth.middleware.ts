import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { supabaseAdmin } from "../config/supabase";

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      throw new CustomError(401, "Token de autenticación requerido");
    }

    const token = header.replace("Bearer ", "");

    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data.user) {
      throw new CustomError(401, "Token inválido o expirado");
    }

    req.user = { id: data.user.id, email: data.user.email ?? undefined };

    next();
  } catch (error) {
    next(error);
  }
};