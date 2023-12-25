import path from "path";

export default interface IConfig {
  file: {
    useSrcDir?: boolean;
    routes?: string;
    docs?: string;
  };
  docs: {
    enabled?: boolean;
    url?: string;
    exposeApiDocs?: boolean;
  };
}

export class Config {
  file: IConfig["file"] = {};
  docs: IConfig["docs"] = {};

  constructor(conf: IConfig = { file: {}, docs: {} }) {
    this.docs = conf.docs;
    this.file = conf.file;
  }

  get buildDir() {
    return path.join(process.cwd(), ".api");
  }

  get srcDir() {
    if (this.file.useSrcDir) return path.join(process.cwd(), "src");
  }

  get routesDir() {
    return path.join(
      this.file.useSrcDir
        ? `src/${this.file.routes || "routes"}`
        : this.file.routes || "routes",
    );
  }

  get docsDir() {
    return path.join(
      this.file.useSrcDir
        ? `src/${this.file.docs || "docs"}`
        : this.file.docs || "docs",
    );
  }
}
