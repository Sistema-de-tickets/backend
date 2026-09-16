import { prisma } from "../../config/prisma";
import { userInclude, UserWithRelations } from "./usuarios.types";
import { UpdateStatusInput, UpdateUserInput } from "./usuarios.schema";

export const findAllUsers = async (): Promise<UserWithRelations[]> => {
  return prisma.public_users.findMany({
    include: userInclude,
    orderBy: { created_at: "desc" },
  });
};

export const findUserById = async (
  userId: string,
): Promise<UserWithRelations | null> => {
  return prisma.public_users.findUnique({
    where: { id: userId },
    include: userInclude,
  });
};

export const findUserAuthData = async (userId: string) => {
  const user = await prisma.public_users.findUnique({
    where: { id: userId },
    select: { status: true, roles: { select: { name: true } } },
  });

  return user
    ? { role: user.roles.name, status: user.status }
    : { role: null, status: null };
};

export const createUserRepository = async (
  id: string,
  data: { primer_nombre: string; segundo_nombre?: string; apellido_paterno: string; apellido_materno?: string; role_id: string; area_id: string },
) => {
  return prisma.public_users.create({
    data: { ...data, id },
    include: userInclude,
  });
};

export const updateUserById = async (userId: string, data: UpdateUserInput) => {
  return prisma.public_users.update({
    where: { id: userId },
    data,
    include: userInclude,
  });
};

export const updateUserStatus = async (
  userId: string,
  data: UpdateStatusInput,
) => {
  return prisma.public_users.update({
    where: { id: userId },
    data,
    include: userInclude,
  });
};

export const deleteUserById = async (userId: string) => {
  return prisma.public_users.delete({ where: { id: userId } });
};

export const findAuthUserByEmail = async (email: string) => {
  return prisma.auth_users.findFirst({
    where: { email },
    select: { id: true },
  });
};

export const findRoleById = async (roleId: string) => {
  return prisma.roles.findUnique({ where: { id: roleId } });
};

export const findAreaById = async (areaId: string) => {
  return prisma.areas.findUnique({ where: { id: areaId } });
};

export const findAllRoles = async () => {
  return prisma.roles.findMany({ orderBy: { name: "asc" } });
};

export const findAllAreas = async () => {
  return prisma.areas.findMany({ orderBy: { name: "asc" } });
};