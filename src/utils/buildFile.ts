import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { transformFile } from "@swc/core";
import { FileMeta } from "@/types/File";

const buildFile = async function buildFile({ folder, file }: FileMeta) {
  const buildDir = join(process.cwd(), ".api");
  mkdirSync(join(buildDir, folder.replace("src/", "")), { recursive: true });
  await transformFile(join(folder, file), {
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
  })
    .then(({ code }) => {
      writeFileSync(
        join(buildDir, folder.replace("src/", ""), file.replace(".ts", ".js")),
        code,
      );
    })
    .catch(console.error);
};

export default buildFile;
