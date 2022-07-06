import { OpenAPIV3_1 } from "openapi-types";

const BearerSchema: OpenAPIV3_1.SecuritySchemeObject = {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
};

export default BearerSchema;
