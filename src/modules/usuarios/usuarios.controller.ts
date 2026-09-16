import { NextFunction, Request, Response } from "express";
import {
  changeUserStatus,
  createUser,
  deleteUser,
  getAreas,
  getRoles,
  getUserById,
  getUsers,
  updateUser,
} from "./usuarios.service";
import {
  createUserSchema,
  updateStatusSchema,
  updateUserSchema,
} from "./usuarios.schema";

export const getUsersController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getUsers();

    return res.status(200).json({
      message: "usuarios obtenidos satisfactoriamente",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUserById(req.params.id);

    return res.status(200).json({
      message: "usuario obtenido con éxito",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Datos inválidos",
        error: result.error.flatten(),
      });
    }

    const user = await createUser(result.data);

    return res.status(201).json({
      message: "Usuario creado con éxito",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = updateUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Datos incorrectos o vacíos",
        error: result.error.flatten(),
      });
    }

    const user = await updateUser(req.params.id, result.data);

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatusController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = updateStatusSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Datos incorrectos o vacíos",
        error: result.error.flatten(),
      });
    }

    const user = await changeUserStatus(req.params.id, result.data);

    return res.status(200).json({
      message: "Estado del usuario actualizado correctamente",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await deleteUser(req.params.id);

    return res.status(200).json({
      message: "Usuario dado de baja correctamente",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getRolesController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await getRoles();

    return res.status(200).json({
      message: "roles obtenidos satisfactoriamente",
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};

export const getAreasController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const areas = await getAreas();

    return res.status(200).json({
      message: "áreas obtenidas satisfactoriamente",
      data: areas,
    });
  } catch (error) {
    next(error);
  }
};