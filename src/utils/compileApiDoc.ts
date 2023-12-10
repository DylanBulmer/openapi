import { Document, Route } from "..";
import { join } from "path";
import IConfig from "@/types/Config";
import getRoutes from "./getRoutes";
import chalk from "chalk";
import { writeFileSync } from "fs";

export default async function compileApiDoc(config: IConfig, doc: Document) {
  const buildDir = join(process.cwd(), ".api");
  const builtRoutesDir = join(buildDir, config.file.routes || "routes");

  // GET DOCUMENT FROM DOCS BUILD DIR
  const promiseArray: Promise<void>[] = [];

  // compile files into api doc and app router
  for await (const { file, method, url } of getRoutes(builtRoutesDir)) {
    console.debug(
      chalk.blueBright(
        `Compiling apidoc: [${method.toUpperCase()}] ${url.express}`,
      ),
    );
    promiseArray.push(
      import(join(builtRoutesDir, file)).then(
        ({ default: route }: { default: Route }) => {
          doc._addPath(method, url.openapi, route);
        },
      ),
    );
  }

  Promise.all(promiseArray).then(() => {
    writeFileSync(join(buildDir, "apidoc.json"), JSON.stringify(doc.doc()));
  });
}
