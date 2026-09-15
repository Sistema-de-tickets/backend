import { NextFunction, Response, Request } from "express";
import { AuthService } from "./auth.service";
import {
  loginSchema,
  authSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.schema";
import CustomError from "../../errors/CustomError";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = authSchema.safeParse(req.body);

      if (error) {
        throw error;
      }

      const user = await authService.register(data);

      return res.status(201).json({
        message: "Usuario creado correctamente",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = loginSchema.safeParse(req.body);

      if (error) {
        throw error;
      }

      const user = await authService.login(data);

      return res.status(200).json({
        message: "Usuario ingresado correctamente",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = forgotPasswordSchema.safeParse(req.body);

      if (error) {
        throw error;
      }
      const userData = await authService.forgotPassword(data);

      return res.status(200).json({
        message: "proceso para recuperar contraseña mediante correo exitoso",
        data: userData,
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = resetPasswordSchema.safeParse(req.body);

      if (error) {
        throw error;
      }
      const userData = await authService.resetPassword(data);

      return res.status(200).json({
        message: "Contraseña cambiada correctamente",
        data: userData,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const currentUser = await authService.getCurrentUser();

      if (!currentUser) {
        throw new CustomError(401, "Usuario no autenticado");
      }

      return res.status(200).json({
        message: "Usuario obtenido correctamente",
        data: currentUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
