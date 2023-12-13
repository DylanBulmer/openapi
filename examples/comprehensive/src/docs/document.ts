import { Document } from "@dylanbulmer/api";

export default new Document()
  .title("My API")
  .version("1.0.0")
  .description("A sample API to illustrate OpenAPI concepts")
  .server({ url: "http://localhost:8000", description: "Localhost" })
  .contact({
    name: "Dylan Bulmer",
    url: "https://dylanbulmer.com",
    email: "dylan@dylanbulmer.com",
  })
  .license({
    name: "MIT",
    url: "https://opensource.org/licenses/MIT",
  });
