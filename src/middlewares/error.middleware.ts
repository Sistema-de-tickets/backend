import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Datos inválidos",
      details: error.flatten(),
    });
  }

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }

  return res.status(500).json({
    message: "Error inesperado",
  });
};
