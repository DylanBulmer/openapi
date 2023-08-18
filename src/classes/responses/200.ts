import { OpenAPIV3_1 } from "openapi-types";
import Response, { type IResponse } from "../Response.js";

const defaultDescription = `The HTTP \`200 OK\` success status response code indicates that the request has succeeded. A 200 response is cacheable by default.

The meaning of a success depends on the HTTP request method:
  
* [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET): The resource has been fetched and is transmitted in the message body.
* [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD): The representation headers are included in the response without any message body
* [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST): The resource describing the result of the action is transmitted in the message body
* [TRACE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE): The message body contains the request message as received by the server.

The successful result of a [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) or a [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) is often not a \`200 OK\` but a \`204 No Content\` (or a \`201 Created\` when the resource is uploaded for the first time).
([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200))`;
const defaultContent: { [k: string]: OpenAPIV3_1.MediaTypeObject } = {
  "application/json": {
    schema: {
      properties: {
        detail: {
          type: "object",
          properties: {
            message: {
              type: "string",
              examples: ["OK"],
            },
          },
        },
      },
    },
  },
};

export default class Response200 extends Response {
  constructor({ description, content }: Partial<IResponse>) {
    super({
      description: description || defaultDescription,
      content: content || defaultContent,
    });
  }
}
