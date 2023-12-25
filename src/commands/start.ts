import { ErrorRequestHandler } from "express";
import chalk from "chalk";
import path from "path";
import getRoutes from "@/utils/getRoutes";
import type Route from "@/classes/Route";
import getConfig from "@/utils/getConfig";
import { ApiError, app } from "@/index.js";
import { existsSync, readFileSync } from "fs";
import { OpenAPIV3_1 } from "openapi-types";
import * as elementsUi from "@/utils/elements-ui";
import { Config } from "@/classes/Config";
import bodyParser from "body-parser";

const start = async function start(opts: { host: string; port: string }) {
  // get the config
  const config = new Config(await getConfig());
  const { buildDir } = config;
  console.debug(chalk.blueBright(`Config: ${JSON.stringify(config)}`));

  // get build directory
  const builtRoutesDir = path.join(buildDir, config.file.routes || "routes");

  // get compiled apidoc file
  const apiDoc: OpenAPIV3_1.Document = JSON.parse(
    readFileSync(path.join(buildDir, "apidoc.json"), {
      encoding: "utf-8",
    }),
  );

  // setup app with body-parser
  app.use(bodyParser.json());

  if (existsSync(path.join(buildDir, "app.js"))) {
    import(path.join(buildDir, "app.js"));
  }

  // add files into app router
  for await (const { file, method, url } of getRoutes(builtRoutesDir)) {
    console.debug(
      chalk.blueBright(
        `Creating route: [${method.toUpperCase()}] ${url.express}`,
      ),
    );
    await import(path.join(builtRoutesDir, file)).then(
      ({ default: route }: { default: Route }) => {
        // apply the route to express app.
        app[method](url.express, ...route.express);
      },
    );
  }

  if (config.docs?.enabled) {
    const url = config.docs.url || "/docs";
    app.get(url, (req, res) => {
      res.send(elementsUi.render(apiDoc));
    });

    console.log(`ElementsUI is hosted at ${url}`);
  }

  if (config.docs.exposeApiDocs) {
    const url = "/apidocs";
    app.get(url, (_req, res) => {
      res.status(200).json(apiDoc);
    });
    app.get(`${url}/expanded`, (_req, res) => {
      const readable = JSON.stringify(apiDoc, undefined, 2);
      res.status(200).send(`<pre>${readable}</pre>`);
    });

    console.log(`Apidoc is exposed at ${url} and ${url}/expanded`);
  }

  // setup default error handle
  const errorHandler: ErrorRequestHandler =
    app.get("errorHandler") ||
    ((err: ApiError, req, res) => {
      return res.status(err?.status || 500).json({
        detail: {
          message: err.message,
        },
      });
    });

  app.use(((err: Error | undefined, req, res, next) => {
    // if headers are already sent, let express handler the error
    if (res.headersSent) {
      return next(err);
    }

    // default error
    const error404 = new ApiError({
      status: 404,
      message: `not found: ${req.path}`,
    });

    // if the path is for the API, have it handle the error
    return errorHandler(err || error404, req, res, next);
  }) as ErrorRequestHandler);

  console.log(chalk.white.bold(`Starting server on ${opts.host}:${opts.port}`));

  return {
    opts,
    doc: apiDoc,
    app,
  };
};

export default start;
