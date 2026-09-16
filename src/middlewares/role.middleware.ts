import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { findUserAuthData } from "../modules/usuarios/usuarios.repository";

export const requireRole = (...allowedRoles: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        throw new CustomError(401, "Usuario no autenticado");
      }

      const { role, status } = await findUserAuthData(req.user.id);

      if (status === "inactivo") {
        throw new CustomError(403, "Usuario inactivo");
      }

      if (!role || !allowedRoles.includes(role)) {
        throw new CustomError(403, "No tienes permisos para esta acción");
      }

      req.user.role = role;

      next();
    } catch (error) {
      next(error);
    }
  };
};