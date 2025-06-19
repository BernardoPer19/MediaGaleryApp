"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.LoginSchema = exports.RegisterSchema = exports.UserSchema = exports.AdressSchema = void 0;
exports.validateLogin = validateLogin;
const zod_1 = require("zod");
exports.AdressSchema = zod_1.z.object({
    country: zod_1.z.string().min(1, "Country is required"),
    city: zod_1.z.string().min(1, "City is required"),
});
exports.UserSchema = zod_1.z.object({
    user_id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email(),
    createdAt: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    // adress: AdressSchema,
});
exports.RegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    // adress: AdressSchema,
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
const validateRegister = (input) => {
    const result = exports.UserSchema.safeParse(input);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
};
exports.validateRegister = validateRegister;
function validateLogin(data) {
    const result = exports.LoginSchema.safeParse(data);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
}
