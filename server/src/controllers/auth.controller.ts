import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { createRefreshCookie, clearRefreshCookie } from "../utils/cookie";

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  const { user, accessToken, refreshToken } = await authService.registerUser(
    email,
    password,
    firstName,
    lastName,
  );

  createRefreshCookie(res, refreshToken);
  res.status(201).json({ accessToken, user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await authService.loginUser(
    email,
    password,
  );

  createRefreshCookie(res, refreshToken);
  res.status(200).json({ accessToken });
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  const { newAccessToken, newRefreshToken } =
    await authService.refreshUserSession(token);

  createRefreshCookie(res, newRefreshToken);
  res.status(200).json({ accessToken: newAccessToken });
};

export const logout = async (_req: Request, res: Response) => {
  clearRefreshCookie(res);
  res.sendStatus(204);
};
