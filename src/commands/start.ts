import chalk from "chalk";
import path from "path";
import getRoutes from "@/utils/getRoutes";
import type Route from "@/classes/Route";
import type { OpenAPIV3_1 } from "openapi-types";
import getConfig from "@/utils/getConfig";

const start = async function start(opts: { host: string; port: string }) {
  // get the config
  const config = await getConfig();
  console.debug(chalk.blueBright(`Config: ${JSON.stringify(config)}`));

  const apiDoc = {} as OpenAPIV3_1.Document;
  const buildDir = path.join(process.cwd(), ".api");
  const builtRoutesDir = path.join(buildDir, config.file.routes || "routes")

  // GET DOCUMENT FROM DOCS BUILD DIR

  // compile files into api doc and app router
  for await (const { file, method, url } of getRoutes(builtRoutesDir)) {
    console.debug(
      chalk.blueBright(
        `Compiling route: [${method.toUpperCase()}] ${url.express}`,
      ),
    );
    await import(path.join(builtRoutesDir, file)).then(
      ({ default: route }: { default: Route }) => {
        if (!apiDoc.paths) {
          apiDoc.paths = {};
        }

        const path = apiDoc.paths[url.openapi];

        if (typeof path === "undefined") {
          apiDoc.paths[url.openapi] = {
            [method]: route.doc() ? route.doc() : {},
          };
        } else {
          (<OpenAPIV3_1.PathsObject>path)[method] = route.doc()
            ? route.doc()
            : {};
        }
      },
    );
  }

  console.log(chalk.white.bold(`Starting server on ${opts.host}:${opts.port}`));
  console.log(JSON.stringify(apiDoc));

  return {
    doc: apiDoc,
    app: null,
  };
};

export default start;
