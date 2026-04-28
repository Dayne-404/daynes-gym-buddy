import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import http from "http";
import { validateEnv } from "./config/validateEnv";
import { env } from "process";
import { prisma } from "./config/prisma";
import { checkDatabaseConnection } from "./config/checkDatabase";

const startServer = async () => {
  try {
    validateEnv();
    await checkDatabaseConnection();

    const PORT = env.PORT;
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`\nServer running on port ${PORT}`);
    });

    const shutdown = async (signal: string) => {
      console.log(`\n${signal} recieved. Shutting down...`);
      server.close(async () => {
        console.log("HTTP Server closed");

        await prisma.$disconnect();
        console.log("Database disconnected");
        
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
