import { OpenAPIV3_1 } from "openapi-types";
import * as Responses from "../classes/responses";

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
      "200": Responses.Response200.doc(),
      "201": Responses.Response201.doc(),
      "204": Responses.Response204.doc(),
      "400": Responses.Response400.doc(),
      "401": Responses.Response401.doc(),
      "403": Responses.Response403.doc(),
      "404": Responses.Response404.doc(),
      "418": Responses.Response418.doc(),
      "500": Responses.Response500.doc(),
      "503": Responses.Response503.doc(),
    },
  },
};

export default settings;
