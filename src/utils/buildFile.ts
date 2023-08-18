import fs from "fs";
import path from "path";
import swc from "@swc/core";
import IConfig from "@/types/Config";

const buildFile = function buildFile(
  config: IConfig,
  {
    folder,
    file,
  }: {
    folder: string;
    file: string;
  },
) {
  const buildDir = path.join(process.cwd(), ".api");
  const routesDir = path.join(process.cwd(), config.file.routes);
  const buildRoutesDir = path.join(buildDir, "routes");
  fs.mkdirSync(path.join(buildRoutesDir, folder), { recursive: true });
  swc
    .transformFile(path.join(routesDir, folder, file), {
      jsc: {
        parser: {
          syntax: "typescript",
          dynamicImport: true,
        },
      },
      env: {
        targets: {
          node: 16,
        },
      },
      module: {
        type: "es6",
      },
      minify: true,
    })
    .then(({ code }) => {
      fs.writeFileSync(
        path.join(buildRoutesDir, folder, file.replace(".ts", ".js")),
        code,
      );
    });
};

export default buildFile;
