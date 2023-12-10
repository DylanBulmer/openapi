import path from "path";
import fs from "fs";
import { FileMeta } from "@/types/File";

/*
  This utility recursively reads a directory and outputs an 
  iterative list of folder, file combinations via an async
  generator.
*/
const getFiles = async function* getFiles(
  folder: string,
  basePath = "/",
): AsyncGenerator<FileMeta> {
  // get dirents from folder location.
  const dirents = fs
    .readdirSync(path.resolve(folder), { withFileTypes: true })
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
    const res = path.join(folder, dirent.name);
    if (dirent.isDirectory()) {
      // if folder, find files
      yield* getFiles(res, `${basePath}${dirent.name}/`);
    } else {
      // else get file name and return details
      let currentPath;

      // if the base path is the root, change current path to root.
      if (basePath === "/") {
        currentPath = basePath;
      }
      // else update current path with the base path without the trailing slash.
      else {
        const base = basePath.substring(0, basePath.length - 1);
        currentPath = base;
      }

      // yeild result, replacing all dynamic routes to their appropriate form.
      yield {
        folder,
        path: currentPath,
        file: dirent.name,
      };
    }
  }
};

export default getFiles;
