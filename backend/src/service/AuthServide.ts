import { prisma } from "../libs/prisma";
import { RegisterType } from "../schema/AuthSchema";
import { comparePassword, hashedPassword } from "../utils/AuthUtils";

export class AuthService {
  static async verifyEmail(email: string) {
    try {
      const foundEmail = await prisma.user.findFirst({ where: { email } });
      return !!foundEmail;
    } catch (error) {
      throw new Error("Error al verificar el correo");
    }
  }

  static async registerUser(user: RegisterType) {
      const existingUser = await prisma.user.findFirst({
        where: { email: user.email },
      });

      if (existingUser) {
        throw new Error("El correo ya está registrado");
      }
      const hashingPassowrd = await hashedPassword(user.password);

      const register = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashingPassowrd,
        },
      });
      return register;
  }

  static async LoginService(email: string, password: string) {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }

    return user;
  }
}
