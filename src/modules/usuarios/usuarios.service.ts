import CustomError from "../../errors/CustomError";
import { supabaseAdmin } from "../../config/supabase";
import {
  createUserRepository,
  findAllAreas,
  findAllRoles,
  findAllUsers,
  findAreaById,
  findAuthUserByEmail,
  findRoleById,
  findUserById,
  updateUserById,
  updateUserStatus,
} from "./usuarios.repository";
import {
  CreateUserInput,
  UpdateStatusInput,
  UpdateUserInput,
} from "./usuarios.schema";

export const getUsers = async () => {
  return findAllUsers();
};

export const getRoles = async () => {
  return findAllRoles();
};

export const getAreas = async () => {
  return findAllAreas();
};

export const getUserById = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new CustomError(404, `El usuario con id ${userId} no existe`);
  }

  return user;
};

export const createUser = async (data: CreateUserInput) => {
  await ensureRoleAndAreaExist(data.role_id, data.area_id);

  const existing = await findAuthUserByEmail(data.email);

  if (existing) {
    throw new CustomError(409, "Ese correo ya está registrado");
  }

  const { data: authUser, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        primer_nombre: data.primer_nombre,
        segundo_nombre: data.segundo_nombre,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
      },
    });

  if (authError || !authUser.user) {
    throw new CustomError(
      500,
      `No se pudo crear el usuario de autenticación: ${authError?.message ?? "error desconocido"}`,
    );
  }

  try {
    const existingProfile = await findUserById(authUser.user.id);

    if (existingProfile) {
      return await updateUserById(authUser.user.id, {
        primer_nombre: data.primer_nombre,
        segundo_nombre: data.segundo_nombre,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
        role_id: data.role_id,
        area_id: data.area_id,
      });
    }

    return await createUserRepository(authUser.user.id, {
      primer_nombre: data.primer_nombre,
      segundo_nombre: data.segundo_nombre,
      apellido_paterno: data.apellido_paterno,
      apellido_materno: data.apellido_materno,
      role_id: data.role_id,
      area_id: data.area_id,
    });
  } catch (error) {
    await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
    throw error;
  }
};

export const updateUser = async (userId: string, data: UpdateUserInput) => {
  await getUserById(userId);

  if (data.role_id || data.area_id) {
    await ensureRoleAndAreaExist(data.role_id, data.area_id);
  }

  return updateUserById(userId, data);
};

export const changeUserStatus = async (
  userId: string,
  data: UpdateStatusInput,
) => {
  await getUserById(userId);

  return updateUserStatus(userId, data);
};

export const deleteUser = async (userId: string) => {
  await getUserById(userId);

  return updateUserStatus(userId, { status: "inactivo" });
};

const ensureRoleAndAreaExist = async (roleId?: string, areaId?: string) => {
  if (roleId) {
    const role = await findRoleById(roleId);
    if (!role) {
      throw new CustomError(404, `El rol con id ${roleId} no existe`);
    }
  }

  if (areaId) {
    const area = await findAreaById(areaId);
    if (!area) {
      throw new CustomError(404, `El área con id ${areaId} no existe`);
    }
  }
};