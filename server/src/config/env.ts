import { Secret } from "jsonwebtoken";

export const env = {
  port: Number(process.env.PORT) || 3000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  isProd: process.env.NODE_ENV === "production",
  accessTokenSecret: (process.env.ACCESS_TOKEN_SECRET as Secret),
  refreshTokenSecret: (process.env.REFRESH_TOKEN_SECRET as Secret),
  accessTokenExpiresMinutes:
    Number(process.env.ACCESS_TOKEN_EXPIRES_MINUTES) || 15,
  refreshTokenExpiresDays: Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) || 7,
  cookies: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  },
};
