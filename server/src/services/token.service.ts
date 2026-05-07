// src/services/token.service.ts
import argon2 from "argon2";
import { prisma } from "../config/prisma";
import { env } from "../config/env";
import { signToken, verifyToken } from "../utils/jwt";
import { AccessTokenPayload, RefreshTokenPayload } from "../types/auth.types";

/**
 * Generates a short-lived access token.
 */
export const generateAccessToken = (
  userId: number,
  email: string,
  firstName: string,
  lastName: string,
  avatarColor: string,
  tokenVersion: number,
  profileComplete: boolean,
): string => {
  const payload: AccessTokenPayload = {
    userId,
    email,
    firstName,
    lastName,
    avatarColor,
    tokenVersion,
    profileComplete,
  };

  return signToken(
    payload,
    env.accessTokenSecret,
    `${env.accessTokenExpiresMinutes}m`,
  );
};

/**
 * Generates a refresh token, hashes it,
 * and stores it in the database.
 */
export const generateRefreshToken = async (
  userId: number,
  tokenVersion: number,
): Promise<string> => {
  const payload: RefreshTokenPayload = { userId, tokenVersion };

  const token = signToken(
    payload,
    env.refreshTokenSecret,
    `${env.refreshTokenExpiresDays}d`,
  );

  const hashedToken = await argon2.hash(token);

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: hashedToken,
      expiresAt: new Date(Date.now() + env.refreshTokenExpiresDays * 86400000),
    },
  });

  return token;
};

/**
 * Validates an access token.
 */
export const validateAccessToken = (token: string) =>
  verifyToken<AccessTokenPayload>(token, env.accessTokenSecret);

/**
 * Validates a refresh token.
 */
export const validateRefreshToken = (token: string) =>
  verifyToken<RefreshTokenPayload>(token, env.refreshTokenSecret);
