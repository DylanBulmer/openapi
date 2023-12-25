import fs from "fs";
import path from "path";
import { Document } from "..";
import getConfig from "@/utils/getConfig";
import buildFile from "@/utils/buildFile";
import getFiles from "@/utils/getFiles";
import compileApiDoc from "@/utils/compileApiDoc";
import { Config } from "@/classes/Config";

const build = async function build() {
  const config = new Config(await getConfig());
  const { buildDir } = config;

  // clean the repository
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }

  // create build directory
  fs.mkdirSync(buildDir);

  // build files
  const buildPromises: Promise<void>[] = [];

  if (config.srcDir) {
    const dirents = fs.readdirSync(config.srcDir, {
      encoding: "utf-8",
      withFileTypes: true,
    });
    for (const dirent of dirents) {
      if (dirent.isFile()) {
        buildPromises.push(
          buildFile({
            folder: "src/",
            path: "src/",
            file: dirent.name,
          }),
        );
      } else {
        for await (const file of getFiles(path.join("src", dirent.name))) {
          buildPromises.push(buildFile(file));
        }
      }
    }
  }

  await Promise.all(buildPromises);

  // setup open api doc
  let doc: Document;
  if (fs.existsSync(path.resolve(buildDir, "docs/document.js"))) {
    doc = await import(`${buildDir}/docs/document.js`).then(
      ({ default: d }: { default: Document }) => d,
    );
  } else {
    doc = new Document();
  }

  // compile api doc
  await compileApiDoc(config, doc);
};

export default build;
