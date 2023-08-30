import { Responses, Route } from "../../../../";

const route = new Route()
  .summary("Static route")
  .description("Testing static route")
  .tags("TEST")
  .response("200", Responses.Response200)
  .operation((req, res) => {
    res.status(200).json({ detail: { message: "OK" } });
  });

export default route;
