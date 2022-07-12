import { OpenAPIV3_1 } from "openapi-types";

const ErrorSchema: OpenAPIV3_1.SchemaObject = {
  title: "Error Schema",
  allOf: [{ $ref: "#/components/schemas/GenericSchema" }],
};

export default ErrorSchema;
