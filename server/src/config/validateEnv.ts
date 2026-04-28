/**
 * Validates required enviornment variables at application startup
 *
 * This ensures the app fails fast if critical configuration is missing.
 * Should be executed before the Express app is created
 */

const requiredEnvVars = [
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "NODE_ENV",
] as const;

const optionalEnvVars = [
  "CLIENT_URL",
  "PORT",
  "ACCESS_TOKEN_EXPIRES_MINUTES",
  "REFRESH_TOKEN_EXPIRES_DAYS",
] as const;

const VALID_NODE_ENVS = ["development", "production", "test"] as const;

export const validateEnv = () => {
  console.log("\Validating environment variables...\n");

  const missingRequired = requiredEnvVars.filter((key) => !process.env[key]);

  const missingOptional = optionalEnvVars.filter((key) => !process.env[key]);

  if (missingOptional.length) {
    console.warn(
      `Missing optional env vars (using defaults):\n\n${missingOptional.join("\n")}\n`,
    );
  }

  if (missingRequired.length) {
    console.error(
      `Missing REQUIRED env vars:\n\n${missingRequired.join("\n")}\n`,
    );
    process.exit(1);
  }

  if (!VALID_NODE_ENVS.includes(process.env.NODE_ENV as any)) {
    console.error(
      `Invalid NODE_ENV: "${process.env.NODE_ENV}"\nValid values: ${VALID_NODE_ENVS.join(", ")}\n`,
    );
    process.exit(1);
  }

  console.log("Environment variables validated");  
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
};
