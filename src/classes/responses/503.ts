import { OpenAPIV3_1 } from "openapi-types";
import Response from "../Response";

const defaultDescription = `The HTTP \`503 Service Unavailable\` server error response code indicates that the server is not ready to handle the request.

Common causes are a server that is down for maintenance or that is overloaded. This response should be used for temporary conditions and the [Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) HTTP header should, if possible, contain the estimated time for the recovery of the service. ([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503))`;
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
              examples: ["Service unavailable"],
            },
          },
        },
      },
    },
  },
};

const Response503 = new Response()
  .description(defaultDescription)
  .content("application/json", defaultContent);
export default Response503;
