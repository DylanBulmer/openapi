import { Express } from "express";
import path from "path";
import * as fs from "fs";
import { Method, METHOD, Operation, Route } from "./types/Route";
import { OpenAPIV3_1 } from "openapi-types";
import * as elementsUi from "./utils/elements-ui";

interface IOptions {
  app: Express;
  api: {
    doc: OpenAPIV3_1.Document;
    url?: string;
    expose?: boolean;
    routes: string;
  };
  ui?: {
    url?: string;
    enable: boolean;
  };
}

export const initialize = function initialize({ app, api, ui }: IOptions) {
  return new Promise(resolve => {
    (async () => {
      for await (const r of getFiles(api.routes)) {
        await import(path.join(api.routes, r.url)).then((route: Route) => {
          for (const key of <METHOD[]>Object.keys(route)) {
            const method = Method[key];
            const operation = <Operation>route[key];
            const defaultDoc: OpenAPIV3_1.OperationObject = {};

            if (!api.doc.paths) {
              api.doc.paths = {};
            }

            const path = api.doc.paths[r.url];

            // add route dynamically to the OpenAPI docs
            if (typeof path === "undefined") {
              api.doc.paths[r.url] = {
                [method]: operation.apiDoc ? operation.apiDoc : defaultDoc,
              };
            } else {
              (<OpenAPIV3_1.PathsObject>path)[method] = operation.apiDoc
                ? operation.apiDoc
                : defaultDoc;
            }

            switch (key) {
              case "GET":
                app.get(r.url, operation);
                break;
              case "POST":
                app.post(r.url, operation);
                break;
              case "PATCH":
                app.patch(r.url, operation);
                break;
              case "PUT":
                app.put(r.url, operation);
                break;
              case "OPTIONS":
                app.options(r.url, operation);
                break;
              case "DELETE":
                app.delete(r.url, operation);
                break;
              case "HEAD":
                app.head(r.url, operation);
                break;
            }
          }
        });
      }
    })();

    if (api.expose) {
      app.get(api.url || "/openapi", (req, res) => {
        res.status(200).json(api.doc);
      });
      app.get(
        api.url ? `${api.url}/expanded` : "/openapi/expanded",
        (req, res) => {
          const readable = JSON.stringify(api.doc, undefined, 2);
          res.status(200).send(`<pre>${readable}</pre>`);
        },
      );

      console.log(
        `OpenAPI spec is hosted at ${api.url || "/openapi"} and ${
          api.url || "/openapi"
        }/expanded`,
      );
    }

    if (ui?.enable) {
      app.get(ui.url || "/docs", (req, res) => {
        res.send(elementsUi.render(api.doc));
      });

      console.log(`ElementsUI is hosted at ${ui.url || "/docs"}`);
    }

    return resolve(api.doc);
  });
};

const getFiles = async function* getFiles(
  folder: string,
  basePath = "/",
): AsyncGenerator<{ url: string; name: string }> {
  // get dirents from folder location.
  const dirents = fs.readdirSync(folder, { withFileTypes: true });
  // for each dirent, determine if it's a folder or file.
  for (const dirent of dirents) {
    const res = path.resolve(folder, dirent.name);
    if (dirent.isDirectory()) {
      // if folder, find files
      yield* getFiles(res, `${basePath}${dirent.name}/`);
    } else {
      // else get file name and return details
      const route = dirent.name.replace(/\.(t|j)s/g, "");
      yield { url: basePath + route, name: route };
    }
  }
};
