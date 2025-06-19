var _a;
import { validateLogin, validateRegister } from '../schema/AuthSchema.js';
import { AuthService } from '../service/AuthServide.js';
import { createToken } from '../utils/AuthUtils.js';
export class AuthController {
    static async logoutController(_req, res) {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).send({ message: "Sesión cerrada correctamente" });
    }
    static async protectedRoute(req, res) {
        const user = req.user;
        if (!user) {
            res
                .status(400)
                .json({ message: "Cuenta no autorizada para esta accion" });
        }
        res.status(200).json({ message: "Usuario autorizado", user });
    }
}
_a = AuthController;
AuthController.registerUser = async (req, res) => {
    try {
        const user = validateRegister(req.body);
        const register = await AuthService.registerUser(user);
        res.status(200).json({
            message: "El usuario se registro con éxito!",
            bienvenida: `Bienvenido!! ${register}`,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Error desconocido al registrarse");
    }
};
AuthController.login = async (req, res) => {
    try {
        const validatedData = validateLogin(req.body);
        const user = await AuthService.LoginService(validatedData.email, validatedData.password);
        const userForToken = {
            user_id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
        };
        const token = createToken(userForToken);
        const options = {
            httpOnly: true,
            secure: false,
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
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error("Error al registrarse");
        }
    }
};
AuthController.getCurrentUser = (req, res) => {
    try {
        const user = req.user;
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener usuario actual" });
    }
};
AuthController.getProfileData = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        // Aquí puedes agregar lógica para obtener más datos del perfil si es necesario
        res.status(200).json({
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener datos del perfil" });
    }
};
