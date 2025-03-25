import { type NextFunction, type Request, type Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("hit middleware");
  req.userId = "1"; // hardcoded for now, will be fetched from clerk
  next();
};
