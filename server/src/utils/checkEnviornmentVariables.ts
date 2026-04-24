const requiredEnvVars = ["ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET", "NODE_ENV"];

const optionalEnvVars = ["CLIENT_URL", "PORT"];

const checkEnviornmentVariables = () => {
  const missingVars: string[] = [];
  const missingOptionalVars: string[] = [];
  console.log("\nChecking Enviornment Variables...");

  for (const key of optionalEnvVars) {
    if (!process.env[key]) {
      missingOptionalVars.push(key);
    }
  }

  if (missingOptionalVars.length > 0) {
    console.log(
      `Missing optional enviornment variables:\n\n${optionalEnvVars.join("\n")}\n\nContinuing with defaults\n`,
    );
  }

  for (const key of requiredEnvVars) {
    if (!process.env[key]) {
      missingVars.push(key);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required enviornment variables:\n\n${missingVars.join("\n")}\n`,
    );
  }

  console.log("All enviornment variables are set");
};

export default checkEnviornmentVariables;
