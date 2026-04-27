import { Response, NextFunction, Request } from "express";
import ApiError from "../utils/ApiError";
import { validateAccessToken } from "../utils/generateToken";
import { prisma } from "../config/prisma";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    throw new ApiError(401, "Missing access token");
  }

  const token = header.split(" ")[1];
  const payload = validateAccessToken(token);

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { tokenVersion: true },
  });

  if (!user || user.tokenVersion !== payload.tokenVersion) {
    throw new ApiError(401, "Invalid token");
  }

  req.userId = payload.userId;
  next();
};