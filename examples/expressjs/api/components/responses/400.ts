import { OpenAPIV3_1 } from "openapi-types";

const R400: OpenAPIV3_1.ResponseObject = {
  description: "The HTTP `400 Bad Request` response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing). ([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400))",
  content: {
    "application/json": {
      schema: {
        allOf: [{ $ref: "#/components/schemas/ErrorSchema" }],
        properties: {
          detail: {
            type: "object",
            properties: {
              message: {
                type: "string",
                examples: ["bad request"],
              },
            },
          },
        },
      },
    },
  },
};

export default R400;
