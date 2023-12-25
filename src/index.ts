#! /usr/bin/env node

import Express from "express";
// import path from "path";
// import { Method, MethodType, Operation, Route } from "./types/Route";
// import { OpenAPIV3_1 } from "openapi-types";
// import * as elementsUi from "./utils/elements-ui";
// import getFiles from "utils/getFiles";

import { Command } from "commander";
import start from "./commands/start";
import build from "./commands/build";
const program = new Command();

program
  .command("start")
  .description("Run the server.")
  .option("-p, --port <port>", "Server port", "8000")
  .option("-h, --host <host>", "Server host", "127.0.0.1")
  .action((...args) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    start(...args).then(({ opts: { port }, app }) => {
      app.listen(port, () => {
        console.log(
          `⚡️ [server]: Server is running at https://localhost:${port}`,
        );
      });
    });
  });

program.command("build").description("Build the server.").action(build);

program.parse();

export * as Responses from "./classes/responses/index.js";
export { default as Document } from "./classes/Document.js";
export { default as Parameter } from "./classes/Paramater.js";
export { default as Response } from "./classes/Response.js";
export { default as MediaTypeObject } from "./classes/MediaTypeObject.js";
export { default as Route } from "./classes/Route.js";
export { default as ApiError } from "./classes/Error.js";
export const app = Express();

// interface IOptions {
//   app: Express;
//   api: {
//     doc: OpenAPIV3_1.Document;
//     url?: string;
//     expose?: boolean;
//     routes: string;
//   };
//   ui?: {
//     url?: string;
//     enable: boolean;
//   };
// }

// export const initialize = function initialize({ app, api, ui }: IOptions) {
//   return new Promise<OpenAPIV3_1.Document>(resolve => {
//     (async () => {
//       for await (const r of getFiles(api.routes)) {
//         await import(path.join(api.routes, r.path)).then((route: Route) => {
//           for (const key of <MethodType[]>Object.keys(route)) {
//             const method = Method[key];
//             const operation = <Operation>route[key];
//             const defaultDoc: OpenAPIV3_1.OperationObject = {};

//             if (!api.doc.paths) {
//               api.doc.paths = {};
//             }

//             const path = api.doc.paths[r.url.openapi];

//             console.log(r);

//             // add route dynamically to the OpenAPI docs
//             // if (typeof path === "undefined") {
//             //   api.doc.paths[r.url.openapi] = {
//             //     [method]: operation.apiDoc ? operation.apiDoc : defaultDoc,
//             //   };
//             // } else {
//             //   (<OpenAPIV3_1.PathsObject>path)[method] = operation.apiDoc
//             //     ? operation.apiDoc
//             //     : defaultDoc;
//             // }

//             // apply the route to express app.
//             // app[Method[key]](r.url.express, operation);
//           }
//         });
//       }

//       // if (api.expose) {
//       //   app.get(api.url || "/apidocs", (_req, res) => {
//       //     res.status(200).json(api.doc);
//       //   });
//       //   app.get(
//       //     api.url ? `${api.url}/expanded` : "/apidocs/expanded",
//       //     (_req, res) => {
//       //       const readable = JSON.stringify(api.doc, undefined, 2);
//       //       res.status(200).send(`<pre>${readable}</pre>`);
//       //     },
//       //   );

//       //   console.log(
//       //     `OpenAPI spec is hosted at ${api.url || "/apidocs"} and ${
//       //       api.url || "/apidocs"
//       //     }/expanded`,
//       //   );
//       // }

//       // if (ui?.enable) {
//       //   app.get(ui.url || "/docs", (req, res) => {
//       //     res.send(elementsUi.render(api.doc));
//       //   });

//       //   console.log(`ElementsUI is hosted at ${ui.url || "/docs"}`);
//       // }

//       return resolve(api.doc);
//     })();
//   });
// };
