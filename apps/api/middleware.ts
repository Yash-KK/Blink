import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "@clerk/backend";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"] || "";
  if (!token) {
    res.status(401).json({ error: "Token not found. User must sign in." });
    return;
  }
  try {
    const verifiedToken = await verifyToken(token, {
      jwtKey: process.env.CLERK_JWT_KEY,
      authorizedParties: ["http://localhost:3000", "api.example.com"],
    });
    req.userId = verifiedToken.sub;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token not verified." });
    return;
  }
}
