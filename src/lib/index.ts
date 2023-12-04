import { readdirSync, lstatSync } from "node:fs";
import { join } from "node:path";

export const root = "/usr/share/doc";

export function getDocs(folder: string) {
  return readdirSync(folder)
    .map((d) => join(folder, d))
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
