import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import ApiError from "../utils/ApiError";
import { prisma } from "../config/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

export const register = (req: Request, res: Response) => {
  console.log("Registering user");

  res.status(200).json({ message: "Register endpoint hit" });
};

export const login = async (req: Request, res: Response) => {
  console.log("Logging in user");

  if (!req.body || !req.body.email || !req.body.password) {
    throw new ApiError(400, "Email and password are required");
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new ApiError(401, "Incorrect email or password");
  }

  const passwordValid = await argon2.verify(user.passwordHash, password);

  if (!passwordValid) {
    throw new ApiError(401, "Incorrect email or password");
  }

  const accessToken = generateAccessToken(
    user.id,
    user.email,
    user.tokenVersion,
  );
  const refreshToken = await generateRefreshToken(user.id, user.tokenVersion);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json(accessToken);
};

export const logout = (req: Request, res: Response) => {
  console.log("Logging out user");

  res.status(200).json({ message: "Logout endpoint hit" });
};

export const refresh = (req: Request, res: Response) => {
  console.log("refreshing token");

  res.status(200).json({ message: "Refresh endpoint hit" });
};

export const me = (req: Request, res: Response) => {
  console.log("Returning user");

  res.status(200).json({ message: "Me endpoint hit" });
};
