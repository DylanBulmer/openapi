import { OpenAPIV3_1 } from "openapi-types";
import Response, { type IResponse } from "../openapi/Response";

const defaultDescription = `The HTTP \`400 Bad Request\` response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing). ([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400))`;
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
              examples: ["Bad request"],
            },
          },
        },
      },
    },
  },
};

export default class Response400 extends Response {
  constructor({ description, content }: Partial<IResponse>) {
    super({
      description: description || defaultDescription,
      content: content || defaultContent,
    });
  }
}
