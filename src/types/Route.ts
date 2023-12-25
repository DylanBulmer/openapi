import { RequestHandler } from "express";

export type MethodType = keyof typeof Method;
export enum Method {
  "CHECKOUT" = "checkout",
  "COPY" = "copy",
  "DELETE" = "delete",
  "GET" = "get",
  "HEAD" = "head",
  "LOCK" = "lock",
  "MERGE" = "merge",
  "MKACTIVITY" = "mkactivity",
  "MKCOL" = "mkcol",
  "MOVE" = "move",
  "M-SEARCH" = "m-search",
  "NOTIFY" = "notify",
  "OPTIONS" = "options",
  "PATCH" = "patch",
  "POST" = "post",
  "PURGE" = "purge",
  "PUT" = "put",
  "REPORT" = "report",
  "SEARCH" = "search",
  "SUBSCRIBE" = "subscribe",
  "TRACE" = "trace",
  "UNLOCK" = "unlock",
  "UNSUBSCRIBE" = "unsubscribe",
}

export type Operation<
  ReqBody extends object,
  P extends string,
  Q extends string,
> = RequestHandler<{ [K in P]: string }, any, ReqBody, { [K in Q]: string }>;

export type Route = Partial<Record<MethodType, Operation<any, string, string>[]>>;
