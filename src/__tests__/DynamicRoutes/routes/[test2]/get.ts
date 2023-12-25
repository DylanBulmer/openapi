import { Responses, Route, Parameter } from "../../../../";

const route = new Route<any, "test2">()
  .params(new Parameter().in("path").name("test2"))
  .summary("Static route")
  .description("Testing dynamic routes")
  .tags("TEST")
  .response("200", Responses.Response200)
  .operation((req, res) => {
    res
      .status(200)
      .json({ detail: { message: "OK", param: req.params.test2 } });
  });

export default route;
