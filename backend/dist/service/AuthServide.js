"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = require("../libs/prisma");
const AuthUtils_1 = require("../utils/AuthUtils");
class AuthService {
    static async verifyEmail(email) {
        try {
            const foundEmail = await prisma_1.prisma.user.findFirst({ where: { email } });
            return !!foundEmail;
        }
        catch (error) {
            throw new Error("Error al verificar el correo");
        }
    }
    static async registerUser(user) {
        const existingUser = await prisma_1.prisma.user.findFirst({
            where: { email: user.email },
        });
        if (existingUser) {
            throw new Error("El correo ya está registrado");
        }
        const hashingPassowrd = await (0, AuthUtils_1.hashedPassword)(user.password);
        const register = await prisma_1.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashingPassowrd,
            },
        });
        return register;
    }
    static async LoginService(email, password) {
        const user = await prisma_1.prisma.user.findFirst({ where: { email } });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const isMatch = await (0, AuthUtils_1.comparePassword)(password, user.password);
        if (!isMatch) {
            throw new Error("Contraseña incorrecta");
        }
        return user;
    }
}
exports.AuthService = AuthService;
