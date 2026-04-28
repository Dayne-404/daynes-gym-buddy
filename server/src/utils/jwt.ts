// src/utils/jwt.ts
import jwt, { Secret, SignOptions } from "jsonwebtoken";

/**
 * Generic JWT signing helper.
 * No business logic or database access here.
 */
export const signToken = (
  payload: object,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"],
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Generic JWT verification helper.
 */
export const verifyToken = <T>(token: string, secret: Secret): T => {
  return jwt.verify(token, secret) as T;
};