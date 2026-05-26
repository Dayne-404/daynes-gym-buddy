import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import { env } from "../config/env";
import { Prisma } from "@prisma/client";

/**
 * Convert known Prisma errors into clean API errors
 */
const handlePrismaError = (err: unknown): ApiError | null => {
  if (err instanceof Prisma.PrismaClientValidationError) {
    return ApiError.badRequest("Invalid request data");
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const meta = err.meta as { target?: string | string[] } | undefined;

    if (err.code === "P2002") {
      const field = Array.isArray(meta?.target)
        ? meta?.target.join(", ")
        : meta?.target;

      return ApiError.badRequest(
        field ? `Duplicate value for field: ${field}` : "Duplicate value",
      );
    }

    if (err.code === "P2003") {
      return ApiError.badRequest("Invalid reference (foreign key error)");
    }

    return ApiError.badRequest("Database validation failed");
  }

  return null;
};

/**
 * Global Express error handler.
 * Responsible for:
 * - Formatting all API error responses
 * - Distinguishing operational vs unexpected errors
 * - Hiding sensitive details in production
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let error: any = err;

  const prismaError = handlePrismaError(err);
  if (prismaError) {
    error = prismaError;
  }

  const isApiError = error instanceof ApiError;

  const status = isApiError ? error.status : 500;
  const message = isApiError ? error.message : "Internal Server Error";

  if (env.isProd) {
    console.error(`[${status}] ${message}`);
  } else {
    console.error("\nERROR");
    console.error("Status:", status);
    console.error("Message:", error.message);
    //console.error("Stack:", error.stack);
    //console.error("Path:", req.originalUrl);
    console.error("Method:", req.method);
    console.error("Body:", req.body);
    //console.error("Query:", req.query);
    //console.error("Params:", req.params);
    //console.error("END ERROR\n");
  }

  return res.status(status).json({
    success: false,
    message,
    ...(isApiError && error.errors ? { errors: error.errors } : {}),
    ...(env.isProd ? {} : { stack: error.stack }),
  });
};
