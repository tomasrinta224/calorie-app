import { NextFunction, Request, Response } from "express";

export const adminGuard = async (
  req: Request<{ user: { is_admin: number } }>,
  res: Response,
  next: NextFunction
) => {
  if (req?.user?.isAdmin) return next();
  return res.status(401).send("Unauthorized");
};
