import express, { type Application } from "express";
import cors from "cors";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes/index.routes";
import cookieParser from "cookie-parser";
import { env } from "./config/env";

const app: Application = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

//Health check
app.get("/", (_req, res) => res.json({ status: "ok" }));

//Routes
app.use("/api", routes);

//Errror handling
app.use(notFound);
app.use(errorHandler);

export default app;
