import { z } from "zod";
export const AdressSchema = z.object({
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
});
export const UserSchema = z.object({
    user_id: z.string().uuid().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    createdAt: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    // adress: AdressSchema,
});
export const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    // adress: AdressSchema,
});
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export const validateRegister = (input) => {
    const result = UserSchema.safeParse(input);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
};
export function validateLogin(data) {
    const result = LoginSchema.safeParse(data);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
}
