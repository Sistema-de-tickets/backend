import { NextFunction, Request, Response } from "express";
import {
  getCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "./companies.service";
import { companySchema, UpdateCompanySchema } from "./company.schema";

/**
 * Obtiene todas las empresas.
 *
 * Delega la obtención de datos al service y devuelve
 * la lista de empresas con HTTP 200.
 *
 * Los errores son delegados al middleware global.
 */

export const getCompaniesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const companies = await getCompanies();
    return res.status(200).json({
      message: "empresas obtenidas satisfactoriamente",
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene una empresa por su ID.
 *
 * El ID se obtiene de los parámetros de la URL y se delega
 * al service, quien se encarga de determinar si la empresa existe.
 *
 * Si la empresa no existe, el service lanza un error 404.
 */

export const getCompanyByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await getCompanyById(id);

    return res.status(200).json({
      message: "Compañía obtenida con éxito",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Crea una nueva empresa.
 *
 * Primero valida el body mediante el schema de Zod.
 * Si los datos son inválidos, responde con HTTP 400.
 *
 * Los datos ya validados son enviados al service,
 * donde se aplican las reglas de negocio.
 */

export const createCompanyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = companySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Datos invalidos",
        error: result.error,
      });
    }

    const company = await createCompany(result.data);

    return res.status(201).json({
      message: "Empresa creada con éxito",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza parcialmente una empresa.
 *
 * Valida el body mediante el schema de actualización,
 * que permite modificar uno o varios campos pero no acepta
 * un objeto vacío.
 *
 * Las reglas de negocio, como verificar que el nombre no
 * pertenezca a otra empresa, son responsabilidad del service.
 */

export const updateCompanyController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = UpdateCompanySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Datos incorrectos o vacios",
        error: result.error,
      });
    }
    const company = await updateCompany(id, result.data);

    return res.status(200).json({
      message: "Se ha actualizado correctamente",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCompanyController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await deleteCompany(id);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
