import { OpenAPIV3_1 } from "openapi-types";

const ApiKeySchema: OpenAPIV3_1.SecuritySchemeObject = {
  type: "apiKey",
  in: "header",
  name: "x-api-key"
};

export default ApiKeySchema;
