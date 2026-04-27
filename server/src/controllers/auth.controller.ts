import { Request, Response } from "express";
import argon2 from "argon2";
import ApiError from "../utils/ApiError";
import { prisma } from "../config/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from "../utils/generateToken";

const clearRefreshCookie = (res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

const createRefreshCookie = (res: Response, token: string) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = async (req: Request, res: Response) => {
  console.log("Registering user");

  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    throw new ApiError(
      400,
      "Email, password, first name, and last name are required",
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new ApiError(400, "Email is already in use");
  }

  const passwordHash = await argon2.hash(password);

  const colors = ["red", "blue", "green", "purple", "orange", "pink"];
  const avatarColor = colors[Math.floor(Math.random() * colors.length)];

  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName,
      lastName,
      avatarColor,
    },
  });

  const accessToken = generateAccessToken(
    newUser.id,
    newUser.email,
    newUser.tokenVersion,
  );

  const refreshToken = await generateRefreshToken(
    newUser.id,
    newUser.tokenVersion,
  );

  createRefreshCookie(res, refreshToken);

  res.status(201).json({ accessToken, user: newUser });
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

  createRefreshCookie(res, refreshToken);

  res.status(201).json(accessToken);
};

//TODO: Maybe change 204 to 200 message
export const logout = async (req: Request, res: Response) => {
  console.log("Logging out user");

  const token = req.cookies.refreshToken;

  if (!token) {
    console.log("No refresh token found in cookies");
    clearRefreshCookie(res);
    return res.sendStatus(204);
  }

  const payload = validateRefreshToken(token);

  if (!payload) {
    clearRefreshCookie(res);
    console.log("Token has no payload");
    return res.sendStatus(204);
  }

  const userTokens = await prisma.refreshToken.findMany({
    where: { userId: payload.userId },
  });

  if (userTokens.length === 0) {
    clearRefreshCookie(res);
    console.log("No refresh tokens found for user");
    return res.sendStatus(204);
  }

  let matchedTokenId: number | null = null;

  for (const dbToken of userTokens) {
    const match = await argon2.verify(dbToken.tokenHash, token);
    if (match) {
      matchedTokenId = dbToken.id;
      break;
    }
  }

  if (matchedTokenId) {
    await prisma.refreshToken.delete({
      where: { id: matchedTokenId },
    });
  } else {
    clearRefreshCookie(res);
    console.log("Token not found in DB");
    return res.sendStatus(204);
  }

  clearRefreshCookie(res);
  res.status(200).json({ message: "Logout endpoint hit" });
};

//Refresh is done,

export const refresh = async (req: Request, res: Response) => {
  console.log("refreshing token");

  const token = req.cookies.refreshToken;

  if (!token) {
    clearRefreshCookie(res);
    throw new ApiError(401, "Missing refresh token");
  }

  // Step 1: Validate the refresh token and extract the payload
  const payload = validateRefreshToken(token);

  if (!payload) {
    clearRefreshCookie(res);
    throw new ApiError(401, "Invalid refresh token");
  }

  const { userId, tokenVersion } = payload;

  // Step 2: Find the refresh token in the database
  const refreshTokens = await prisma.refreshToken.findMany({
    where: { userId },
  });

  let matchedToken = null;

  // Step 3: Verify the token against the hashed tokens in the database
  for (const dbToken of refreshTokens) {
    const match = await argon2.verify(dbToken.tokenHash, token);
    if (match) {
      matchedToken = dbToken;
      break;
    }
  }

  if (!matchedToken) {
    clearRefreshCookie(res);
    throw new ApiError(401, "Refresh token not found");
  }

  // Step 4: Check if the token has expired
  if (matchedToken.expiresAt < new Date()) {
    //TODO: Delete cookie?
    await prisma.refreshToken.delete({ where: { id: matchedToken.id } });
    clearRefreshCookie(res);
    throw new ApiError(401, "Refresh token expired");
  }

  // Step 5: Find the user and check if the token version matches
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // Check that the token version matches
  if (!user || user.tokenVersion !== tokenVersion) {
    //TODO: Delete cookie?
    clearRefreshCookie(res);
    return res.status(401).json({ message: "Session invalidated" });
  }

  // Step 6: Generate new tokens, delete the old refresh token, and set the new refresh token in a cookie
  await prisma.refreshToken.delete({ where: { id: matchedToken.id } });

  const newRefreshToken = await generateRefreshToken(
    user.id,
    user.tokenVersion,
  );

  createRefreshCookie(res, newRefreshToken);

  const newAccessToken = generateAccessToken(
    user.id,
    user.email,
    user.tokenVersion,
  );

  res.status(200).json({ accessToken: newAccessToken });
};

//ME is done

export const me = async (req: Request, res: Response) => {
  console.log("Returning user");

  const userId = req.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatarColor: true,
      goalWeightLb: true,
      dailyCalorieGoal: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({ user });
};
