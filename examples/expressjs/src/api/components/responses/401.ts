import { OpenAPIV3_1 } from "openapi-types";

const R401: OpenAPIV3_1.ResponseObject = {
  description: `The HTTP \`401 Unauthorized\` response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.

This status code is sent with an HTTP [WWW-Authenticate](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate) response header that contains information on how the client can request for the resource again after prompting the user for authentication credentials.

This status code is similar to the \`403 Forbidden\` status code, except that in situations resulting in this status code, user authentication can allow access to the resource.
([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401))`,
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
                examples: ["user unauthorized"],
              },
            },
          },
        },
      },
    },
  },
};

export default R401;
