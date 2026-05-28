import { Secret } from "jsonwebtoken";

/**
 * Centralized enviornment configuration
 *
 * This file is responsible ONLY for:
 * - Reading enviornment variables
 * - Coercing values into proper types
 * - Providing safe defaults where appropriate
 *
 * presence validations happens seperately in `checkEnv.ts`
 */

export const env = Object.freeze({
  /** Server */
  port: Number(process.env.PORT) || 3000,
  isProd: process.env.NODE_ENV === "production",

  /** Frontend */
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  /** JWT Secrets (validated at startup) */
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as Secret,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as Secret,

  /** Token Expiry */
  accessTokenExpiresMinutes:
    Number(process.env.ACCESS_TOKEN_EXPIRES_MINUTES) || 15,
  refreshTokenExpiresDays: Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) || 7,

  /** Cookie Configuration */
  cookies: {
    secure: process.env.NODE_ENV === "production",
    sameSite: (process.env.NODE_ENV === "production" ? "none" : "strict") as "none" | "strict",
  },
});
