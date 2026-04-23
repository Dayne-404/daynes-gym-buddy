import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import http from "http";
import checkEnviornmentVariables from "./utils/checkEnviornmentVariables";

const startServer = () => {
  try {
    checkEnviornmentVariables();

    const PORT = process.env.PORT || 3000;
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`\nServer running on port ${PORT}`);
    });

    const shutdown = (signal:string) => {
        console.log(`\n${signal} recieved. Shutting down...`)
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        })
    }

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();