import path from "path";
import fs from "fs";
import type { Method } from "@/types/Route";

const getRoutes = async function* getRoutes(
  folder: string,
  basePath = "/",
): AsyncGenerator<{
  url: { express: string; openapi: string };
  method: Method;
  file: string;
}> {
  // get dirents from folder location.
  const dirents = fs
    .readdirSync(folder, { withFileTypes: true })
    .sort((a, b) => {
      // sort dynamic routes to end
      const regex = /\[(\w+)\]/i;
      const aIsDynamic = regex.test(a.name) ? 1 : 0;
      const bIsDynamic = regex.test(b.name) ? 1 : 0;
      if (bIsDynamic < aIsDynamic) return 1;
      if (bIsDynamic == aIsDynamic) return 0;
      else return -1;
    });
  // for each dirent, determine if it's a folder or file.
  for (const dirent of dirents) {
    const res = path.resolve(folder, dirent.name);
    if (dirent.isDirectory()) {
      // if folder, find files
      yield* getRoutes(res, `${basePath}${dirent.name}/`);
    } else {
      // else get file name and return details
      const method = dirent.name.replace(/\.(t|j)s/g, "") as Method;
      let currentPath;

      // if route name is index, update url structure
      // if (routePath === "index") {
      // if the base path is the root, change current path to root.
      if (basePath === "/") {
        currentPath = basePath;
      }
      // else update current path with the base path without the trailing slash.
      else {
        const base = basePath.substring(0, basePath.length - 1);
        currentPath = base;
      }
      // }
      // else set the current path to base path plus the route path
      // else {
      // currentPath = `${basePath}${routePath}`;
      // }

      // yeild result, replacing all dynamic routes to their appropriate form.
      yield {
        url: {
          express: currentPath.replace(/\[(?<name>.+)\]/i, ":$1"),
          openapi: currentPath.replace(/\[(?<name>.+)\]/i, "{$1}"),
        },
        method,
        file: `${basePath}${dirent.name}`,
      };
    }
  }
};

export default getRoutes;