import { R200 } from "@dylanbulmer/openapi/classes/responses";
import { Operation } from "@dylanbulmer/openapi/types/Route";

export const POST: Operation =
  /* business middleware not expressible by OpenAPI documentation goes here */
  (req, res) => {
    return res.json({
      detail: {
        token: "string",
        message: "",
      },
    });
  };

// 3.0 specification
POST.apiDoc = {
  description: "Log into the server",
  tags: ["Authentication"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          required: ["email", "otp"],
          properties: {
            email: {
              type: "string",
              examples: ["john.doe@example.com"],
            },
            otp: {
              type: "string",
              examples: ["000000"],
            },
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: R200.description,
      content: {
        "application/json": {
          schema: {
            allOf: [{ $ref: "#/components/schemas/GenericSchema" }],
            description: "blah",
            properties: {
              detail: {
                type: "object",
                required: ["token"],
                properties: {
                  token: {
                    type: "string",
                    examples: ["abc"],
                  },
                },
              },
            },
          },
        },
      },
    },
    "500": {
      $ref: "#/components/responses/500",
    },
    "503": {
      $ref: "#/components/responses/503",
    },
  },
};
