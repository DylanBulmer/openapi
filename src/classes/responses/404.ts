import { OpenAPIV3_1 } from "openapi-types";
import Response, { type IResponse } from "../openapi/Response";

const defaultDescription = `The HTTP \`404 Not Found\` response status code indicates that the server cannot find the requested resource. Links that lead to a 404 page are often called broken or dead links and can be subject to [link rot](https://en.wikipedia.org/wiki/Link_rot).

A 404 status code only indicates that the resource is missing: not whether the absence is temporary or permanent. If a resource is permanently removed, use the \`410 Gone\` status instead. ([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404))`;
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
              examples: ["Not found"],
            },
          },
        },
      },
    },
  },
};

export default class Response404 extends Response {
  constructor({ description, content }: Partial<IResponse>) {
    super({
      description: description || defaultDescription,
      content: content || defaultContent,
    });
  }
}
