import fs from "fs";
import path from "path";
import getConfig from "@/utils/getConfig.js";
import buildFile from "@/utils/buildFile.js";
import getFiles from "@/utils/getFiles.js";

const build = async function build() {
  const config = await getConfig();
  const buildDir = path.join(process.cwd(), ".api");
  const routesDir = path.join(process.cwd(), config.file.routes);

  // clean the repository
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }

  // create build directory
  fs.mkdirSync(buildDir);

  for await (const file of getFiles(routesDir)) {
    buildFile(config, file);
  }
};

export default build;