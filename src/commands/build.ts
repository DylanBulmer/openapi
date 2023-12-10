import fs from "fs";
import path from "path";
import { Document } from "..";
import getConfig from "@/utils/getConfig";
import buildFile from "@/utils/buildFile";
import getFiles from "@/utils/getFiles";
import compileApiDoc from "@/utils/compileApiDoc";

const build = async function build() {
  const config = await getConfig();
  const buildDir = path.join(process.cwd(), ".api");
  const routesDir = path.join(
    config.file.useSrcDir
      ? `src/${config.file.routes || "routes"}`
      : config.file.routes || "routes",
  );
  const docsDir = path.join(
    config.file.useSrcDir
      ? `src/${config.file.docs || "docs"}`
      : config.file.docs || "docs",
  );

  // clean the repository
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }

  // create build directory
  fs.mkdirSync(buildDir);

  // build routes
  console.log(routesDir);
  for await (const file of getFiles(routesDir)) {
    console.log(file.folder);
    await buildFile(file);
  }

  // build docs
  console.log(docsDir);
  for await (const file of getFiles(docsDir)) {
    console.log(file.folder);
    await buildFile(file);
  }

  let doc: Document;

  console.log(path.resolve(buildDir, "docs/document.js"));
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
