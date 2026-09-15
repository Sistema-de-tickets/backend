import CustomError from "../../errors/CustomError";
import {
  AuthInput,
  AuthLogin,
  forgotPasswordInput,
  resetPasswordInput,
} from "./auth.schema";
import { supabase } from "../../config/supabase";
import { prisma } from "../../config/prisma";

export class AuthService {
  async register(data: AuthInput) {
    const { data: authData, error } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw new CustomError(400, error.message);
    }

    const user = await prisma.users.create({
      data: {
        id: authData.user.id,
        primer_nombre: data.primer_nombre,
        segundo_nombre: data.segundo_nombre,
        apellido_paterno: data.apellido_paterno,
        apellido_materno: data.apellido_materno,
        role_id: data.role_id,
        area_id: data.area_id,
      },
    });

    return user;
  }

  async login(data: AuthLogin) {
    const credentials = {
      email: data.email,
      password: data.password,
    };

    const { data: authData, error } =
      await supabase.auth.signInWithPassword(credentials);

    if (error) {
      throw new CustomError(400, error.message);
    }

    return authData;
  }

  async resetPassword(data: resetPasswordInput) {
    const { data: authData, error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      throw new CustomError(400, error.message);
    }

    return authData;
  }

  async forgotPassword(data: forgotPasswordInput) {
    const { data: authData, error } = await supabase.auth.resetPasswordForEmail(
      data.email,
    );

    if (error) {
      throw new CustomError(400, error.message);
    }

    return authData;
  }

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new CustomError(400, error.message);
    }

    return data.user;
  }
}
