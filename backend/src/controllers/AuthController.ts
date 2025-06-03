import { validateLogin, validateRegister } from "../schema/AuthSchema";
import { AuthService } from "../service/AuthServide";
import { CookieOptions, Request, Response } from "express";
import { createToken } from "../utils/AuthUtils";

export class AuthController {
  static registerUser = async (req: Request, res: Response) => {
    try {
      const user = validateRegister(req.body);
      const register = await AuthService.registerUser(user);

      res.status(200).json({
        message: "El usuario se registro con éxito!",
        bienvenida: `Bienvenido!! ${register}`,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error al registrarse", { cause: error.message });
      }
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const validatedData = validateLogin(req.body);

      const user = await AuthService.LoginService(
        validatedData.email,
        validatedData.password
      );

      const token = createToken(user);

      const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      };

      res
        .status(200)
        .cookie("access_token", token, options)
        .json({
          message: "El usuario inició sesión con éxito!",
          bienvenida: `Bienvenido!! ${validatedData.email}`,
        });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error al registrarse", { cause: error.message });
      }
    }
  };
}
