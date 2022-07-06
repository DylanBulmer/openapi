import { OpenAPIV3_1 } from "openapi-types";

const R418: OpenAPIV3_1.ResponseObject = {
  description: `The HTTP \`418 I'm a teapot\` client error response code indicates that the server refuses to brew coffee because it is, permanently, a teapot. A combined coffee/tea pot that is temporarily out of coffee should instead return 503. This error is a reference to Hyper Text Coffee Pot Control Protocol defined in April Fools' jokes in 1998 and 2014.

Some websites use this response for requests they do not wish to handle, such as automated queries. ([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418))`,
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
                examples: ["I'm a teapot"],
              },
            },
          },
        },
      },
    },
  },
};

export default R418;
