import Route from "@dylanbulmer/api/classes/Route.js";
import { Responses } from "@dylanbulmer/api";

const route = new Route()
  .summary("Get all entities.")
  .description("Get all of the entities from the database.")
  .tags("Entity")
  .response("200", Responses.Response200)
  .operation((req, res) => {
    res.status(200).json({ message: "OK" });
  });

export default route;
