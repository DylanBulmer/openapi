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
  return new Promise<OpenAPIV3_1.Document>(resolve => {
    (async () => {
      for await (const r of getFiles(api.routes)) {
        await import(path.join(api.routes, r.path)).then((route: Route) => {
          for (const key of <METHOD[]>Object.keys(route)) {
            const method = Method[key];
            const operation = <Operation>route[key];
            const defaultDoc: OpenAPIV3_1.OperationObject = {};

            if (!api.doc.paths) {
              api.doc.paths = {};
            }

            const path = api.doc.paths[r.url.openapi];

            // add route dynamically to the OpenAPI docs
            if (typeof path === "undefined") {
              api.doc.paths[r.url.openapi] = {
                [method]: operation.apiDoc ? operation.apiDoc : defaultDoc,
              };
            } else {
              (<OpenAPIV3_1.PathsObject>path)[method] = operation.apiDoc
                ? operation.apiDoc
                : defaultDoc;
            }

            // apply the route to express app.
            switch (key) {
              case "GET":
                app.get(r.url.express, operation);
                break;
              case "POST":
                app.post(r.url.express, operation);
                break;
              case "PATCH":
                app.patch(r.url.express, operation);
                break;
              case "PUT":
                app.put(r.url.express, operation);
                break;
              case "OPTIONS":
                app.options(r.url.express, operation);
                break;
              case "DELETE":
                app.delete(r.url.express, operation);
                break;
              case "HEAD":
                app.head(r.url.express, operation);
                break;
            }
          }
        });
      }

      if (api.expose) {
        app.get(api.url || "/apidocs", (_req, res) => {
          res.status(200).json(api.doc);
        });
        app.get(
          api.url ? `${api.url}/expanded` : "/apidocs/expanded",
          (_req, res) => {
            const readable = JSON.stringify(api.doc, undefined, 2);
            res.status(200).send(`<pre>${readable}</pre>`);
          },
        );

        console.log(
          `OpenAPI spec is hosted at ${api.url || "/apidocs"} and ${
            api.url || "/apidocs"
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
    })();
  });
};

const getFiles = async function* getFiles(
  folder: string,
  basePath = "/",
): AsyncGenerator<{
  url: { express: string; openapi: string };
  name: string;
  path: string;
}> {
  // get dirents from folder location.
  const dirents = fs
    .readdirSync(folder, { withFileTypes: true })
    // .sort((a, b) => {
    //   // sort directories to top of array
    //   const aIsDir = a.isDirectory() ? 1 : 0;
    //   const bIsDir = b.isDirectory() ? 1 : 0;
    //   if (bIsDir > aIsDir) return 1;
    //   if (bIsDir == aIsDir) return 0;
    //   else return -1;
    // })
    .sort((a, b) => {
      // sort dynamic routes to end
      const regex = /\[(\w+)\]/i;
      const aIsDynamic = regex.test(a.name) ? 1 : 0;
      const bIsDynamic = regex.test(b.name) ? 1 : 0;
      if (bIsDynamic < aIsDynamic) return 1;
      if (bIsDynamic == aIsDynamic) return 0;
      else return -1;
    });
  // for each dirent, determine if it's a folder or file.
  for (const dirent of dirents) {
    const res = path.resolve(folder, dirent.name);
    if (dirent.isDirectory()) {
      // if folder, find files
      yield* getFiles(res, `${basePath}${dirent.name}/`);
    } else {
      // else get file name and return details
      const routePath = dirent.name.replace(/\.(t|j)s/g, "");
      let currentPath;

      // if route name is index, update url structure
      if (routePath === "index") {
        // if the base path is the root, change current path to root.
        if (basePath === "/") {
          currentPath = basePath;
        }
        // else update current path with the base path without the trailing slash.
        else {
          const base = basePath.substring(0, basePath.length - 1);
          currentPath = base;
        }
      }
      // else set the current path to base path plus the route path
      else {
        currentPath = `${basePath}${routePath}`;
      }

      // yeild result, replacing all dynamic routes to their appropriate form.
      yield {
        url: {
          express: currentPath.replace(/\[(?<name>.+)\]/i, ":$1"),
          openapi: currentPath.replace(/\[(?<name>.+)\]/i, "{$1}"),
        },
        name: routePath,
        path: `${basePath}${routePath}`,
      };
    }
  }
};
