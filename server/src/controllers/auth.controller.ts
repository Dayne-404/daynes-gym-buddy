import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  console.log("Registering user");

  res.status(200).json({ message: "Register endpoint hit" });
};

export const login = (req: Request, res: Response) => {
  console.log("Logging in user");

  res.status(200).json({ message: "Login endpoint hit" });
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
