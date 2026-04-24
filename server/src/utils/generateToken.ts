import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { prisma } from "../config/prisma";
import argon2 from "argon2";

const ACCESS_TOKEN_SECRET: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;
const REFRESH_TOKEN_SECRET: Secret = process.env.REFRESH_TOKEN_SECRET as Secret;

if (!ACCESS_TOKEN_SECRET) {
  console.error("Missing ACCESS_TOKEN_SECRET in environment variables");
  process.exit(1);
}

if (!REFRESH_TOKEN_SECRET) {
  console.error("Missing REFRESH_TOKEN_SECRET in environment variables");
  process.exit(1);
}

export interface AccessTokenPayload {
  userId: number;
  email: string;
  tokenVersion: number;
}

export interface RefreshTokenPayload {
  userId: number;
  tokenVersion: number;
}

const signToken = (
  payload: object,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"],
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const generateAccessToken = (
  userId: number,
  email: string,
  tokenVersion: number,
): string => {
  const payload: AccessTokenPayload = {
    userId,
    email,
    tokenVersion,
  };

  return signToken(payload, ACCESS_TOKEN_SECRET, "10m");
};

export const generateRefreshToken = async (
  userId: number,
  tokenVersion: number,
): Promise<string> => {
  const payload: RefreshTokenPayload = {
    userId,
    tokenVersion,
  };

  const token = signToken(payload, REFRESH_TOKEN_SECRET, "7d");
  const hashedToken = await argon2.hash(token);

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: hashedToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  return token;
};

export const validateAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessTokenPayload;
};

export const validateRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
};
