import express from "express";
import { OpenAPIV3_1 } from "openapi-types";
import path from "path";
import { initialize } from "../../index";
import apiDoc from "../api-doc";

test("Static routes", () => {
  const app = express();

  return initialize({
    app,
    api: {
      doc: apiDoc as OpenAPIV3_1.Document<{ paths: Record<string, unknown> }>,
      routes: path.join(__dirname, "routes"),
      expose: false,
    },
    ui: {
      enable: false,
      // url: "/docs/elements"
    },
  }).then(doc => {
    // check if the static route exists
    expect(Object.keys(doc.paths as OpenAPIV3_1.PathsObject)).toContain(
      "/test",
    );

    // check if static route's GET description is set
    expect(
      (doc.paths as OpenAPIV3_1.PathsObject)["/test"]?.get?.description,
    ).toBe("Testing dynamic routes");
  });
});
