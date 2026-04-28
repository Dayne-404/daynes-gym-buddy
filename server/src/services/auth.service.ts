import argon2 from "argon2";
import ApiError from "../utils/ApiError";
import * as repo from "../repositories/auth.repository";
import {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from "./token.service";

const colors = ["red", "blue", "green", "purple", "orange", "pink"];

export const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  const existingUser = await repo.findUserByEmail(email);
  if (existingUser) throw new ApiError(400, "Email is already in use");

  const passwordHash = await argon2.hash(password);
  const avatarColor = colors[Math.floor(Math.random() * colors.length)];

  const user = await repo.createUser({
    email,
    passwordHash,
    firstName,
    lastName,
    avatarColor,
  });

  const accessToken = generateAccessToken(
    user.id,
    user.email,
    user.firstName,
    user.lastName,
    user.avatarColor,
    user.tokenVersion,
  );

  const refreshToken = await generateRefreshToken(user.id, user.tokenVersion);

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await repo.findUserByEmail(email);
  if (!user) throw new ApiError(401, "Incorrect email or password");

  const valid = await argon2.verify(user.passwordHash, password);
  if (!valid) throw new ApiError(401, "Incorrect email or password");

  const accessToken = generateAccessToken(
    user.id,
    user.email,
    user.firstName,
    user.lastName,
    user.avatarColor,
    user.tokenVersion,
  );

  const refreshToken = await generateRefreshToken(user.id, user.tokenVersion);

  return { accessToken, refreshToken };
};

export const refreshUserSession = async (token: string) => {
  const payload = validateRefreshToken(token);
  if (!payload) throw new ApiError(401, "Invalid refresh token");

  const { userId, tokenVersion } = payload;

  const tokens = await repo.getUserRefreshTokens(userId);

  let matchedToken = null;

  for (const dbToken of tokens) {
    const match = await argon2.verify(dbToken.tokenHash, token);
    if (match) {
      matchedToken = dbToken;
      break;
    }
  }

  if (!matchedToken) throw new ApiError(401, "Refresh token not found");
  if (matchedToken.expiresAt < new Date())
    throw new ApiError(401, "Refresh token expired");

  const user = await repo.findUserById(userId);
  if (!user || user.tokenVersion !== tokenVersion)
    throw new ApiError(401, "Session invalidated");

  await repo.deleteRefreshTokenById(matchedToken.id);

  const newRefreshToken = await generateRefreshToken(
    user.id,
    user.tokenVersion,
  );

  const newAccessToken = generateAccessToken(
    user.id,
    user.email,
    user.firstName,
    user.lastName,
    user.avatarColor,
    user.tokenVersion,
  );

  return { newAccessToken, newRefreshToken };
};
