import { Error } from "../../class/Error";
import { Operation } from "@dylanbulmer/openapi/types/Route";

export const GET: Operation =
  /* business middleware not expressible by OpenAPI documentation goes here */
  (req, res, next) => {
    const bearer = req.headers.authorization;

    if (bearer && bearer.split(" ")[1]) {
      return next(new Error({ status: 418, message: "I'm a teapot" }));
    } else {
      return next(
        new Error({
          status: 401,
          message: "Bearer token is either missing or invalid.",
        }),
      );
    }
  };

// 3.0 specification
GET.apiDoc = {
  description: "Check if the server serves coffee",
  tags: ["System"],
  responses: {
    "401": {
      $ref: "#/components/responses/401",
    },
    "418": {
      $ref: "#/components/responses/418",
    },
    "503": {
      $ref: "#/components/responses/503",
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};
