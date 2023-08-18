import fs from "fs";
import type IConfig from "@/types/Config";
import chalk from "chalk";
import path from "path";

const getConfig = async function getConfig() {
  // get dirents from root location.
  const files = fs
    .readdirSync(path.join(process.cwd()), { withFileTypes: true })
    .filter(d => d.isFile() && /^api\.config/g.test(d.name))
    .map(d => d.name);

  if (files.length > 1) {
    console.error(
      chalk.red(
        `More than one config file exists.\n    [ ${files.join(", ")} ]`,
      ),
    );
    process.exitCode = 1;
    process.exit();
  } else {
    const type = /.(?<ext>(j|t)s(on)?)/g.exec(files[0])?.groups?.ext as string;
    let config;
    if (type === "json") {
      config = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), files[0]), {
          encoding: "utf-8",
        }),
      );
    } else {
      config = await import(path.join(process.cwd(), files[0])).then(
        ({ default: config }: { default: IConfig }) => config,
      );
    }
    return config;
  }
};

export default getConfig;
