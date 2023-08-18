import Route from "@dylanbulmer/api/classes/Route.js";
import { Response200 } from "@dylanbulmer/api/classes/responses/index.js";

const route = new Route()
  .summary("Get all entities.")
  .description("Get all of the entities from the database.")
  .tags("Entity")
  .responses({
    "200": new Response200({}),
  })
  .operation((req, res) => {
    res.status(200).json({ message: "OK" });
  });

export default route;
