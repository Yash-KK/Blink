import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "./config";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const token = req.headers["authorization"];
  // if (!token) {
  // res.status(401).json({ error: "Unauthorized" });
  // return;
  // }

  // req.userId = token.split(".")[0] as string;
  req.userId = "2";
  next();
}
