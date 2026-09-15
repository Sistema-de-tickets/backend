// logica de acceso a los datos
import CustomError from "../../errors/CustomError";
import {
  findAllCompanies,
  findCompanyByName,
  createCompanyRepository,
  findCompanyById,
  updateCompanyById,
  deleteCompanyById,
} from "./company.repository";
import { CreateCompanyInput, UpdateCompanyInput } from "./company.schema";

/**
 * Obtiene todas las empresas.
 *
 * El acceso a la base de datos se delega al repository.
 */

export const getCompanies = async () => {
  return findAllCompanies();
};

/**
 * Busca una empresa por su ID.
 *
 * Si la empresa no existe, interrumpe el flujo lanzando
 * un CustomError con HTTP 404.
 *
 * Esta validación permite que los controllers no tengan
 * que encargarse de comprobar la existencia del recurso.
 */

export const getCompanyById = async (companyId: string) => {
  const existingCompany = await findCompanyById(companyId);

  if (!existingCompany) {
    throw new CustomError(404, `Esa compañia con id ${companyId} no existe`);
  }

  return existingCompany;
};

/**
 * Crea una empresa después de validar las reglas de negocio.
 *
 * Verifica que no exista otra empresa con el mismo nombre.
 * Si el nombre ya está registrado, lanza un error 409 Conflict.
 *
 * Una vez superadas las validaciones, delega la creación
 * al repository.
 */

export const createCompany = async (data: CreateCompanyInput) => {
  const existingCompany = await findCompanyByName(data.name);

  if (existingCompany) {
    throw new CustomError(409, "Ese nombre de empresa ya existe");
  }

  return createCompanyRepository(data);
};

/**
 * Actualiza una empresa parcialmente.
 *
 * Primero verifica que la empresa identificada por el ID exista.
 *
 * Si se proporciona un nuevo nombre, verifica si ya existe
 * otra empresa con ese nombre. Si el nombre pertenece a una
 * empresa diferente, se lanza un error 409 Conflict.
 *
 * Si no existe conflicto, delega la actualización al repository.
 */

export const updateCompany = async (id: string, data: UpdateCompanyInput) => {
  await getCompanyById(id);

  if (data.name !== undefined) {
    const existingCompany = await findCompanyByName(data.name);

    if (existingCompany && existingCompany.id !== id) {
      throw new CustomError(
        409,
        "El nombre que intentas utilizar ya pertenece a otra compañía",
      );
    }
  }

  return updateCompanyById(id, data);
};

export const deleteCompany = async (id: string) => {
  await getCompanyById(id);

  return deleteCompanyById(id);
};
