import ApiError from "../utils/ApiError";
import argon2 from "argon2";
import { coerceBody } from "../utils/coerceBody";
import {
  findUserByIdSafe,
  findUserPasswordHash,
  updateUserById,
  updateUserPasswordHash,
} from "../repositories/user.repositoy";

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (userId?: number) => {
  if (!userId) {
    throw ApiError.unauthorized();
  }

  const user = await findUserByIdSafe(userId);

  if (!user) {
    throw ApiError.notFound("User");
  }

  return user;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: number | undefined,
  body: any,
) => {
  if (!userId) {
    throw ApiError.unauthorized();
  }

  // Never allow these fields to be edited
  delete body.email;
  delete body.passwordHash;

  const sanitizedBody = coerceBody("user", body);

  const updatedUser = await updateUserById(userId, sanitizedBody);

  return updatedUser;
};

/**
 * Change password
 */
export const changePassword = async (
  userId: number | undefined,
  currentPassword: string,
  newPassword: string,
) => {
  if (!userId) {
    throw ApiError.unauthorized();
  }

  if (!currentPassword || !newPassword) {
    throw ApiError.badRequest("Current and new password are required");
  }

  const user = await findUserPasswordHash(userId);

  if (!user) {
    throw ApiError.notFound("User");
  }

  const passwordValid = await argon2.verify(user.passwordHash, currentPassword);

  if (!passwordValid) {
    throw ApiError.unauthorized("Current password is incorrect");
  }

  const newPasswordHash = await argon2.hash(newPassword);

  await updateUserPasswordHash(userId, newPasswordHash);
};
