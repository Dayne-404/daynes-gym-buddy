import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

/**
 * 404 handler middleware
 *
 * Catches all unmatched routes and forwards them
 * to the global error handler as a structured API error.
 */
export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(ApiError.notFound(`Route not found: ${req.originalUrl}`));
};
