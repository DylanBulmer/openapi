import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { Config, transformFile } from "@swc/core";
import { FileMeta } from "@/types/File";

const options: Config = {
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
    type: "commonjs",
  },
  minify: true,
};

const buildFile = async function buildFile({ folder, file }: FileMeta) {
  // setup build
  const buildDir = join(process.cwd(), ".api");
  mkdirSync(join(buildDir, folder.replace("src/", "")), { recursive: true });

  // transform and save file
  await transformFile(join(folder, file), options)
    .then(({ code }) => {
      writeFileSync(
        join(buildDir, folder.replace("src/", ""), file.replace(".ts", ".js")),
        code,
      );
    })
    .catch(console.error);
};

export default buildFile;
