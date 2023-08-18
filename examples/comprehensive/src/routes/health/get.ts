import Route from "@dylanbulmer/api/classes/Route.js";
import { Response200 } from "@dylanbulmer/api/classes/responses/index.js";

const route = new Route()
  .summary("Get health")
  .description("Get the system health.")
  .tags("Health")
  .responses({
    "200": new Response200({}),
  })
  .operation((req, res) => {
    res.status(200).json({ message: "OK" });
  });

export default route;
