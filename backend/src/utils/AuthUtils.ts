import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserType } from "../types/AuthTypes";
import dotenv from "dotenv";
dotenv.config();
export const hashedPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (
  plainPassword: string,
  hashPassword: string
) => {
  const compare = await bcrypt.compare(plainPassword, hashPassword);
  return compare;
};

export const createToken = (user: UserType) => {
  const token = jwt.sign(
    {
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt, // <-- asegurate que esté bien escrito
      },
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return token;
};
