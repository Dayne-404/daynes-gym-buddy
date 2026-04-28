import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import ApiError from "../utils/ApiError";
import { coerceBody } from "../utils/coerceBody";
import argon2 from "argon2";

const safeUserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  avatarColor: true,
  goalWeightLb: true,
  dailyCalorieGoal: true,
  createdAt: true,
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: safeUserSelect,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.sendStatus(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  delete req.body.email;
  delete req.body.passwordHash;

  const sanitizedBody = coerceBody("user", req.body);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: sanitizedBody,
    select: safeUserSelect,
  });

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(updatedUser);
};

export const updatePassword = async (req: Request, res: Response) => {
    const userId = req.userId;

    if(!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const { currentPassword, newPassword } = req.body;

    if(!currentPassword || !newPassword) {
        throw new ApiError(400, "Current and new password are required");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { passwordHash: true },
    });

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const passwordValid = await argon2.verify(user.passwordHash, currentPassword);

    if(!passwordValid) {
        throw new ApiError(401, "Current password is incorrect");
    }

    const newPasswordHash = await argon2.hash(newPassword);

    await prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newPasswordHash },
    });

    res.status(200).json({ message: "Password updated successfully" });
};
