import { Responses, Route } from "../../../";

const route = new Route()
  .summary("Index route")
  .description("Testing route")
  .tags("TEST")
  .response("200", Responses.Response200)
  .operation((_req, res) => {
    res.status(200).json({ detail: { message: "OK" } });
  });

export default route;
