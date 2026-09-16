import { NextFunction, Request, Response } from "express";
import CustomError from "../../errors/CustomError";
import { findUserAuthData } from "../usuarios/usuarios.repository";

export const getMeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user?.id) {
      throw new CustomError(401, "Usuario no autenticado");
    }

    const { role, status } = await findUserAuthData(req.user.id);

    return res.status(200).json({
      message: "Sesión obtenida satisfactoriamente",
      data: {
        id: req.user.id,
        email: req.user.email ?? null,
        role,
        status,
      },
    });
  } catch (error) {
    next(error);
  }
};