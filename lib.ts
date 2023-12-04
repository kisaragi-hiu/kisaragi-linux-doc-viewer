import { readdirSync, lstatSync } from "node:fs";
import { join } from "node:path";

export const root = "/usr/share/doc/";

export function getDocs(folder: string) {
  return readdirSync(folder)
    .filter((d) => {
      const full = join(folder, d);
      const stat = lstatSync(full);
      if (stat.isDirectory()) {
        return readdirSync(full).length > 0;
      } else {
        return true;
      }
    })
    .sort((a, b) => {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    });
}

export function redirect(url: string | URL) {
  return Response.redirect(url, 307);
}
