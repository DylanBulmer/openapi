import { OpenAPIV3_1 } from "openapi-types";

const R403: OpenAPIV3_1.ResponseObject = {
  description: `The HTTP \`403 Forbidden\` response status code indicates that the server understands the request but refuses to authorize it.

  This status is similar to \`401\`, but for the \`403 Forbidden\` status code re-authenticating makes no difference. The access is permanently forbidden and tied to the application logic, such as insufficient rights to a resource. ([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403))`,
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
                examples: ["user forbidden"],
              },
            },
          },
        },
      },
    },
  },
};

export default R403;
