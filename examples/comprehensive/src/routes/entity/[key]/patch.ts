import { Responses, Route, Parameter } from "@dylanbulmer/api";

const pathParam = new Parameter()
  .name("key")
  .description("Entity key")
  .in("path")
  .type("string")
  .required();

const route = new Route<"key">()
  .summary("Update entity by key.")
  .description("Update an entity in the database with the given key.")
  .tags("Entity")
  .params(pathParam)
  .response("200", Responses.Response200)
  .operation((req, res) => {
    res.status(200).json({
      message: "OK",
      details: { key: req.params.key },
    });
  });

export default route;
