import { OpenAPIV3_1 } from "openapi-types";
import { R200, R201, R204, R400, R401, R403, R404, R418, R500, R503 } from "./components/responses";
import { ErrorSchema, GenericSchema } from "./components/schemas";
import { BearerSchema } from "./components/securitySchemas";

const settings: OpenAPIV3_1.Document = {
  openapi: "3.1.0",

  // The servers property breaks all apis for some reason
  servers: [
    {
      url: `http://localhost:8000/api/`,
      description: "Dev Server"
    },
  ],

  info: {
    version: "1.0.0",
    title: "Example API",
    description: "A sample API to illustrate OpenAPI concepts",
    contact: {
      name: "Dylan Bulmer",
      url: "https://dylanbulmer.com",
      email: "dylan@dylanbulmer.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },

  // paths are derived from the routes directory, do not add them here.
  paths: {},

  components: {
    responses: {
      "200": R200,
      "201": R201,
      "204": R204,
      "400": R400,
      "401": R401,
      "403": R403,
      "404": R404,
      "418": R418,
      "500": R500,
      "503": R503,
    },
    schemas: {
      GenericSchema: GenericSchema,
      ErrorSchema: ErrorSchema,
    },
    securitySchemes: {
      Bearer: BearerSchema,
    },
  },
};

export default settings;
