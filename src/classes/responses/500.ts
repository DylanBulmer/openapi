import { OpenAPIV3_1 } from "openapi-types";
import Response from "../Response";

const defaultDescription = `The HTTP \`500 Internal Server Error\` server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.

This error response is a generic "catch-all" response. Usually, this indicates the server cannot find a better 5xx error code to response. Sometimes, server administrators log error responses like the 500 status code with more details about the request to prevent the error from happening again in the future. ([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500))`;
const defaultContent: { [k: string]: OpenAPIV3_1.MediaTypeObject } = {
  "application/json": {
    schema: {
      allOf: [{ $ref: "#/components/schemas/ErrorSchema" }],
      properties: {
        detail: {
          type: "object",
          properties: {
            message: {
              type: "string",
              examples: ["Internal server error"],
            },
          },
        },
      },
    },
  },
};

const Response500 = new Response()
  .description(defaultDescription)
  .content("application/json", defaultContent);
export default Response500;
