import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const hashedPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};
export const comparePassword = async (plainPassword, hashPassword) => {
    const compare = await bcrypt.compare(plainPassword, hashPassword);
    return compare;
};
export const createToken = (user) => {
    const token = jwt.sign({
        user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt, // <-- asegurate que esté bien escrito
        },
    }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
};
