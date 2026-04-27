const requiredEnvVars = [
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "NODE_ENV",
];

const optionalEnvVars = ["CLIENT_URL", "PORT"];

export const checkEnvironmentVariables = () => {
  console.log("\nChecking environment variables...\n");

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

  console.log("Environment variables validated");
};
