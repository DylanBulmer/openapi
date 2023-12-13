import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { transformFile } from "@swc/core";

const buildDoc = async function buildDoc({
  folder,
  file,
}: {
  folder: string;
  file: string;
}) {
  const buildDir = join(process.cwd(), ".api");
  mkdirSync(join(buildDir, folder.replace("src/", "")), { recursive: true });
  return transformFile(join(folder, file), {
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
    .then(async ({ code }) => {
      const fileName = join(
        buildDir,
        folder.replace("src/", ""),
        file.replace(".ts", ".js"),
      );
      writeFileSync(fileName, code);
    })
    .catch(console.error);
};

export default buildDoc;
