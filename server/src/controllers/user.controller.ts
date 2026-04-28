import { Request, Response } from "express";
import {
  getCurrentUser,
  updateUserProfile,
  changePassword,
} from "../services/user.service";

export const getUser = async (req: Request, res: Response) => {
  const user = await getCurrentUser(req.userId);
  res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const updatedUser = await updateUserProfile(req.userId, req.body);
  res.status(200).json(updatedUser);
};

export const updatePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  await changePassword(req.userId, currentPassword, newPassword);

  res.status(200).json({ message: "Password updated successfully" });
};
