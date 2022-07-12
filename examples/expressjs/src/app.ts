import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import v1 from "./api";
import { Error } from "./class/Error";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("short"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", v1);

app.use(((err, req, res, next) => {
  // if headers are already sent, let express handler the error
  if (res.headersSent) {
    return next(err);
  }

  // if the path is for the API, have it handle the error
  if (req.path.startsWith("/api")) {
    return v1.get("errorHandler")(err, req, res, next);
  }

  // if all fails, send the error to express
  return next(err);
}) as express.ErrorRequestHandler);

app.use((req, res, next) => {
  // catch 404 errors?

  // if the path is for API v1, have v1 handler the error
  if (req.path.startsWith("/api")) {
    const err = new Error({ status: 404, message: `not found: ${req.path}` });
    return v1.get("errorHandler")(err, req, res, next);
  }
});

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${port}`);
});

export default app;
