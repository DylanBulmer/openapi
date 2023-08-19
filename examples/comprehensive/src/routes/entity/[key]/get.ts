import { Responses, Route, Parameter } from "@dylanbulmer/api";

const pathParam = new Parameter()
  .name("key")
  .description("Entity key")
  .in("path")
  .type("string")
  .required();
const queryParam = new Parameter(pathParam.doc()).name("queryKey").in("query");

const route = new Route<"key", "queryKey">()
  .summary("Get entity by key.")
  .description("Get an entity from the database with the given key.")
  .tags("Entity")
  .params(pathParam, queryParam)
  .response("200", Responses.Response200)
  .operation((req, res) => {
    res.status(200).json({
      message: "OK",
      details: {
        key: req.params.key,
        query: req.query.queryKey,
      },
    });
  });

export default route;
