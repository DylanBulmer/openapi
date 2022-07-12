import express from "express";
import jwt, { Algorithm, } from "jsonwebtoken";
import { Error } from "./Error";

export function verifyToken(
  res: express.Response,
  token: string,
  next: express.NextFunction
) {
  const bearerRegex = /^Bearer\s/;

  if (token && bearerRegex.test(token)) {
    const newToken = token.replace(bearerRegex, "");
    jwt.verify(
      newToken,
      "secretKey",
      {
        issuer: process.env.JWT_ISSUER,
      },
      (error, decoded) => {
        if (error === null && decoded) {
          return next();
        }
        return next(res.sendStatus(403));
      }
    );
  } else {
    return next(res.sendStatus(403));
  }
}

export function generateToken(
  payload: jwt.JwtPayload,
  next: express.NextFunction
) {
  try {
    const signOpts: jwt.SignOptions = {
      issuer: process.env.JWT_ISSUER,
      algorithm: <Algorithm>process.env.JWT_ALGORITHM,
    };
    return jwt.sign(payload, <string>process.env.JWT_SECRET, signOpts);
  } catch (err) {
    next(new Error({ status: 500, message: <string>err }));
  }
}
