import chalk from "chalk";
import path from "path";
import getRoutes from "@/utils/getRoutes.js";
import type Route from "@/classes/Route.js";
import type { OpenAPIV3_1 } from "openapi-types";
import getConfig from "@/utils/getConfig.js";

const start = async function start(opts: { host: string; port: string }) {
  const apiDoc = {} as OpenAPIV3_1.Document;
  const buildDir = path.join(process.cwd(), ".api/routes");

  // get the config
  const config = await getConfig();
  console.debug(chalk.blueBright(`Config: ${JSON.stringify(config)}`));

  // get the files
  const routeMethods = await constructApp(buildDir);
  console.log(routeMethods);

  for (const { file, method, url } of routeMethods) {
    await import(path.join(buildDir, file)).then(
      ({ default: route }: { default: Route }) => {
        if (!apiDoc.paths) {
          apiDoc.paths = {};
        }

        const path = apiDoc.paths[url.openapi];

        if (typeof path === "undefined") {
          apiDoc.paths[url.openapi] = {
            [method]: route.doc ? route.doc : {},
          };
        } else {
          (<OpenAPIV3_1.PathsObject>path)[method] = route.doc ? route.doc : {};
        }
      },
    );
  }

  console.log(chalk.white.bold(`Starting server on ${opts.host}:${opts.port}`));
  console.log(JSON.stringify(apiDoc));
};

const constructApp = async function constructApp(path: string) {
  const routeMethods = [];

  for await (const route of getRoutes(path)) {
    routeMethods.push(route);
  }

  return routeMethods;
};

export default start;
