import { Responses, Route } from "@dylanbulmer/api";

const route = new Route()
  .summary("Get health")
  .description("Get the system health.")
  .tags("Health")
  .response("200", Responses.Response200)
  .operation((req, res) => {
    res.status(200).json({ message: "OK" });
  });

export default route;
