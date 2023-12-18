import { Responses, Route } from "@dylanbulmer/api";
import { graphqlHTTP } from "express-graphql";

const route = new Route()
  .summary("GraphQL entrypoint")
  .description("Use express-graphql with the api framework")
  .tags("GraphQL")
  .response("200", Responses.Response200)
  .operation(
    // middleware for auth,
    (_req, _res, next) => {
      next();
    },
    // graphql
    graphqlHTTP({
      schema: {},
    }),
  );

export default route;
