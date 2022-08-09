import { RequestHandler } from "express";
import { OpenAPIV3_1 } from "openapi-types";

export type METHOD =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";

export enum Method {
  "GET" = "get",
  "POST" = "post",
  "PUT" = "put",
  "DELETE" = "delete",
  "PATCH" = "patch",
  "OPTIONS" = "options",
  "HEAD" = "head",
}

export type Operation = (RequestHandler | RequestHandler[]) & {
  apiDoc?: OpenAPIV3_1.OperationObject;
};

export interface Route {
  GET?: Operation;
  POST?: Operation;
  PUT?: Operation;
  DELETE?: Operation;
  PATCH?: Operation;
  OPTIONS?: Operation;
  HEAD?: Operation;
}
