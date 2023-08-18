import Route from "@dylanbulmer/api/classes/Route.js";
import { Response200 } from "@dylanbulmer/api/classes/responses/index.js";

const route = new Route<"key">()
  .summary("Update entity by key.")
  .description("Update an entity in the database with the given key.")
  .tags("Entity")
  .params({
    key: { type: "string", required: true, description: "Entity key" },
  })
  .responses({
    "200": new Response200({}),
  })
  .operation((req, res) => {
    res.status(200).json({
      message: "OK",
      details: { key: req.params.key },
    });
  });

export default route;
