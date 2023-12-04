import { readdirSync, lstatSync } from "node:fs";
import { join } from "node:path";

export function getDocs() {
  const docFolder = "/usr/share/doc";
  return readdirSync(docFolder)
    .map((d) => join(docFolder, d))
    .filter((d) => {
      const stat = lstatSync(d);
      if (stat.isDirectory()) {
        return readdirSync(d).length > 0;
      } else {
        return true;
      }
    })
    .sort((a, b) => {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    });
}
