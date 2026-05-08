/**
 * Custom API Error class.
 *
 * Used to throw operational (expected) errors that should be sent to the client.
 * Our global error middleware will format these into proper HTTP responses.
 */
export default class ApiError extends Error {
  status: number;
  isOperational: boolean;
  errors?: Record<string, string>;

  constructor(status: number, message: string, errors?: Record<string, string>) {
    super(message);

    this.status = status;
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad request") {
    return new ApiError(400, message);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(resource = "Resource") {
    return new ApiError(404, `${resource} not found`);
  }

  static conflict(message = "Conflict") {
    return new ApiError(409, message);
  }

  static internal(message = "Internal server error") {
    return new ApiError(500, message);
  }
}
