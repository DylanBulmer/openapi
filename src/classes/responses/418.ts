import { OpenAPIV3_1 } from "openapi-types";
import Response from "../Response";

const defaultDescription = `The HTTP \`418 I'm a teapot\` client error response code indicates that the server refuses to brew coffee because it is, permanently, a teapot. A combined coffee/tea pot that is temporarily out of coffee should instead return 503. This error is a reference to Hyper Text Coffee Pot Control Protocol defined in April Fools' jokes in 1998 and 2014.

Some websites use this response for requests they do not wish to handle, such as automated queries. ([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418))`;
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
              examples: ["I'm a teapot"],
            },
          },
        },
      },
    },
  },
};

const Response418 = new Response()
  .description(defaultDescription)
  .content("application/json", defaultContent);
export default Response418;
