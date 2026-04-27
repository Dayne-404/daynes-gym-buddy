import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { prisma } from "../config/prisma";
import argon2 from "argon2";
import { env } from "../config/env";

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

  return signToken(
    payload,
    env.accessTokenSecret,
    `${env.accessTokenExpiresMinutes}m`,
  );
};

export const generateRefreshToken = async (
  userId: number,
  tokenVersion: number,
): Promise<string> => {
  const payload: RefreshTokenPayload = {
    userId,
    tokenVersion,
  };

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
      expiresAt: new Date(
        Date.now() + env.refreshTokenExpiresDays * 24 * 60 * 60 * 1000,
      ), 
    },
  });

  return token;
};

export const validateAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, env.accessTokenSecret) as AccessTokenPayload;
};

export const validateRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, env.refreshTokenSecret) as RefreshTokenPayload;
};
