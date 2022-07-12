import { OpenAPIV3_1 } from "openapi-types";

const GenericSchema: OpenAPIV3_1.SchemaObject = {
  title: "Generic Schema",
  required: ["detail"],
  properties: {
    detail: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Hello world!"
        }
      }
    },
  },
};

export default GenericSchema;
