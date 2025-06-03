import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { UserType } from "../types/AuthTypes";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    res
      .status(401)
      .json({ message: "No autorizado: Token no proporcionado" });
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      user: UserType;
    };

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido o expirado" });
    return
  }

}
