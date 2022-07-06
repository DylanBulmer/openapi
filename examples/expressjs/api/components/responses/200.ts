import { OpenAPIV3_1 } from "openapi-types";

const R200: OpenAPIV3_1.ResponseObject = {
  description: `The HTTP \`200 OK\` success status response code indicates that the request has succeeded. A 200 response is cacheable by default.

The meaning of a success depends on the HTTP request method:
  
* [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET): The resource has been fetched and is transmitted in the message body.
* [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD): The representation headers are included in the response without any message body
* [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST): The resource describing the result of the action is transmitted in the message body
* [TRACE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE): The message body contains the request message as received by the server.

The successful result of a [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) or a [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) is often not a \`200 OK\` but a \`204 No Content\` (or a \`201 Created\` when the resource is uploaded for the first time).
([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200))`,
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
                examples: ["success"],
              },
            },
          },
        },
      },
    },
  },
};

export default R200;
