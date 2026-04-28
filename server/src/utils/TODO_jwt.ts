import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

/**
 * JWT payloads used across the application
 */

export interface AccessTokenPayload {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarColor: string;
  tokenVersion: number;
}

export interface RefreshTokenPayload {
  userId: number;
  tokenVersion: number;
}

/**
 * Internal helper for signing JWTs
 */
const signToken = (
  payload: object,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"],
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Generate short-lived access token (used for API auth)
 */
export const generateAccessToken = (
  payload: AccessTokenPayload,
): string => {
  return signToken(
    payload,
    env.accessTokenSecret,
    `${env.accessTokenExpiresMinutes}m`,
  );
};

/**
 * Generate long-lived refresh token (returned to client)
 * NOTE: DB storage is handled in auth.service.ts
 */
export const generateRefreshToken = (
  payload: RefreshTokenPayload,
): string => {
  return signToken(
    payload,
    env.refreshTokenSecret,
    `${env.refreshTokenExpiresDays}d`,
  );
};

/**
 * Verify and decode access token
 */
export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, env.accessTokenSecret) as AccessTokenPayload;
};

/**
 * Verify and decode refresh token
 */
export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, env.refreshTokenSecret) as RefreshTokenPayload;
};