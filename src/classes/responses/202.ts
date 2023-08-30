import { OpenAPIV3_1 } from "openapi-types";
import Response from "../Response";

const defaultDescription = `The HyperText Transfer Protocol (HTTP) \`202 Accepted\` response status code indicates that the request has been accepted for processing, but the processing has not been completed; in fact, processing may not have started yet. The request might or might not eventually be acted upon, as it might be disallowed when processing actually takes place.

202 is non-committal, meaning that there is no way for the HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.
([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202))`;
const defaultContent: { [k: string]: OpenAPIV3_1.MediaTypeObject } = {
  "application/json": {
    schema: {
      properties: {
        detail: {
          type: "object",
          properties: {
            message: {
              type: "string",
              examples: ["Accepted"],
            },
          },
        },
      },
    },
  },
};

const Response202 = new Response()
  .description(defaultDescription)
  .content("application/json", defaultContent);
export default Response202;
