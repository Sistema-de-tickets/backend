import { CreateCompanyInput, UpdateCompanyInput } from "./company.schema";
import { prisma } from "../../config/prisma";

/**
 * Capa de acceso a datos para Company.
 *
 * Contiene las operaciones que interactúan directamente
 * con la base de datos mediante Prisma.
 *
 * Esta capa no contiene reglas de negocio.
 */

/**
 * Obtiene todas las empresas ordenadas de la más reciente
 * a la más antigua.
 */

export const findAllCompanies = async () => {
  return prisma.company.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Busca una empresa por su nombre.
 *
 * Retorna la empresa encontrada o null si no existe.
 */

export const findCompanyByName = async (companyName: string) => {
  return prisma.company.findUnique({
    where: {
      name: companyName,
    },
  });
};

/**
 * Actualiza una empresa mediante su ID.
 *
 * Recibe únicamente los campos que deben modificarse.
 */

export const updateCompanyById = async (
  id: string,
  data: UpdateCompanyInput,
) => {
  return prisma.company.update({
    where: { id },
    data,
  });
};

/**
 * Busca una empresa mediante su ID.
 *
 * Retorna la empresa encontrada o null si no existe.
 */

export const findCompanyById = async (companyId: string) => {
  return prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });
};

/**
 * Crea una nueva empresa en la base de datos.
 */

export const createCompanyRepository = async (data: CreateCompanyInput) => {
  return prisma.company.create({
    data: {
      name: data.name,
      website: data.website,
      industry: data.industry,
      description: data.description,
    },
  });
};

export const deleteCompanyById = async (companyId: string) => {
  return prisma.company.delete({
    where: { id: companyId },
  });
};
