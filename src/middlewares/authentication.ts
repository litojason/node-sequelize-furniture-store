import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../lib/jwt";
import { CustomError } from "./errors";

export interface RequestWithUser extends Request {
  userId: number;
}

export const isAuthenticated = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) throw new CustomError(401, "Unathorized");

  const [prefix, token] = authHeader.split(" ");

  if (!prefix || prefix !== "Bearer")
    throw new CustomError(401, "No bearer prefix found.");
  if (!token) throw new CustomError(401, "Token not found.");

  try {
    const decoded = verifyToken(token) as { id: number; email: string };
    if (!decoded) throw new CustomError(400, "Token is invalid!");

    if (decoded) {
      req.userId = decoded.id;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
