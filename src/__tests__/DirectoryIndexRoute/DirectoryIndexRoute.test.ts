import express from "express";
import { OpenAPIV3_1 } from "openapi-types";
import path from "path";
import { initialize } from "../../index";
import apiDoc from "../api-doc";

test("Index routes", () => {
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
    // check if the root index route exists
    expect(Object.keys(doc.paths as OpenAPIV3_1.PathsObject)).toContain("/");
    expect((doc.paths as OpenAPIV3_1.PathsObject)["/"]?.get?.description).toBe(
      "Testing index route",
    );

    // check if the nested index route exists
    expect(Object.keys(doc.paths as OpenAPIV3_1.PathsObject)).toContain(
      "/test",
    );
    expect(
      (doc.paths as OpenAPIV3_1.PathsObject)["/test"]?.get?.description,
    ).toBe("Testing nested index route");
  });
});
