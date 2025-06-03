import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(400).json({
    success: false,
    message: err.message || "Ocurrió un error inesperado",
  });
};
