import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { createRefreshCookie, clearRefreshCookie } from "../utils/cookie";
import ApiError from "../utils/ApiError";

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  const { user, accessToken, refreshToken, } = await authService.registerUser(
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

  const { accessToken, refreshToken, user } = await authService.loginUser(
    email,
    password,
  );

  createRefreshCookie(res, refreshToken);
  res.status(200).json({ accessToken, user });
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) throw ApiError.unauthorized("Refresh token must be provided");

  const { newAccessToken, newRefreshToken, user } =
    await authService.refreshUserSession(token);

  createRefreshCookie(res, newRefreshToken);
  res.status(200).json({ accessToken: newAccessToken, user });
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    clearRefreshCookie(res);
    return res.sendStatus(204);
  }

  await authService.logoutUser(token);

  clearRefreshCookie(res);

  res.sendStatus(204);
};
