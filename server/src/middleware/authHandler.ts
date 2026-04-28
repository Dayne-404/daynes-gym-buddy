import { Response, NextFunction, Request } from "express";
import ApiError from "../utils/ApiError";
import { verifyAccessToken } from "../utils/generateToken";
import { prisma } from "../config/prisma";

/**
 * Authentication middleware
 *
 * Verifies:
 * - JWT validity
 * - User existence
 * - Token version (logout invalidation)
 *
 * Attaches:
 * - req.userId
 */
export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Missing access token");
    }

    const token = header.split(" ")[1];

    let payload;

    try {
      payload = verifyAccessToken(token);
    } catch {
      throw ApiError.unauthorized("Invalid or expired token");
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { tokenVersion: true },
    });

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      throw ApiError.unauthorized("Token has been invalidated");
    }

    req.userId = payload.userId;

    return next();
  } catch (err) {
    next(err);
  }
};
