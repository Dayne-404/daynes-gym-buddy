import { Response } from "express";
import { env } from "../config/env";

export const clearRefreshCookie = (res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.cookies.secure,
    sameSite: env.cookies.sameSite,
  });
};

export const createRefreshCookie = (res: Response, token: string) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: env.cookies.secure,
    sameSite: env.cookies.sameSite,
    maxAge: env.refreshTokenExpiresDays * 24 * 60 * 60 * 1000,
  });
};
