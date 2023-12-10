import { app, ApiError } from "@dylanbulmer/api";
import { ErrorRequestHandler } from "express";

const ErrorHandler: ErrorRequestHandler = (err: ApiError, req, res) => {
  return res.status(err.status).json({
    detail: {
      message: err.message,
    },
  });
};

app.set("errorHandler", ErrorHandler);
