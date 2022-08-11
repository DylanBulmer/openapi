import express from "express";
import { OpenAPIV3_1 } from "openapi-types";
import path from "path";
import { initialize } from "../../index";
import apiDoc from "../api-doc";

test("Dynamic routes", () => {
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
    const paths = doc.paths as OpenAPIV3_1.PathsObject;
    const pathKeys = Object.keys(paths);
    // check if dynamic route file exists
    expect(pathKeys).toContain("/{test}");
    expect(paths["/{test}"]?.get?.description).toBe("Testing dynamic routes");
    // check if dynamic route folder exists
    expect(pathKeys).toContain("/{test2}");
    expect(paths["/{test2}"]?.get?.description).toBe(
      "Testing dynamic folder as route",
    );
  });
});
