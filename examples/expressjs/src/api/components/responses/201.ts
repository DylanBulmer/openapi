import { OpenAPIV3_1 } from "openapi-types";

const R200: OpenAPIV3_1.ResponseObject = {
  description: `The HTTP \`201 Created\` success status response code indicates that the request has succeeded and has led to the creation of a resource. The new resource is effectively created before this response is sent back and the new resource is returned in the body of the message, its location being either the URL of the request, or the content of the [Location](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) header.

The common use case of this status code is as the result of a [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) request.
([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201))`,
  content: {
    "application/json": {
      schema: {
        allOf: [{ $ref: "#/components/schemas/GenericSchema" }],
        properties: {
          detail: {
            type: "object",
            properties: {
              message: {
                type: "string",
                examples: ["created"],
              },
            },
          },
        },
      },
    },
  },
};

export default R200;
