import fs from "fs";
import path from "path";
import { Document } from "..";
import getConfig from "@/utils/getConfig";
import buildDoc from "@/utils/buildDoc";
import buildFile from "@/utils/buildFile";
import getFiles from "@/utils/getFiles";
import compileApiDoc from "@/utils/compileApiDoc";
import { Config } from "@/classes/Config";

const build = async function build() {
  const config = new Config(await getConfig());
  const { buildDir, routesDir, docsDir } = config;

  // clean the repository
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }

  // create build directory
  fs.mkdirSync(buildDir);

  // build routes
  for await (const file of getFiles(routesDir)) {
    await buildFile(file);
  }

  // build docs
  for await (const file of getFiles(docsDir)) {
    await buildDoc(file);
  }

  let doc: Document;

  if (fs.existsSync(path.resolve(buildDir, "docs/document.js"))) {
    doc = await import(`${buildDir}/docs/document.js`).then(
      ({ default: d }: { default: Document }) => d,
    );
  } else {
    doc = new Document();
  }

  await compileApiDoc(config, doc);
};

export default build;
