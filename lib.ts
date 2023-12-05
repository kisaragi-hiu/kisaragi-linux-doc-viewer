import { readdirSync, lstatSync } from "node:fs";
import { join } from "node:path";

export const root = "/usr/share/doc/";

export const header = "System Documentation";

export function getDocs(folder: string) {
  return readdirSync(folder)
    .map((d) => {
      const full = join(folder, d);
      const stat = lstatSync(full);
      // Leave files as-is
      if (stat.isFile()) {
        return d;
      }
      const contents = readdirSync(full);
      // For documentations that only have one child, abbreviate
      // intermediate step(s) like GitHub
      if (contents.length === 1) {
        const child = contents[0];
        return join(d, child);
      } else if (contents.length === 0) {
        // We can only use a string here to not trip up typescript
        return "";
        // For other paths, return the basename
      } else {
        return d;
      }
    })
    .filter((d) => d.length > 0)
    .sort((a, b) => {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    });
}

export function redirect(url: string | URL) {
  return Response.redirect(url, 307);
}
