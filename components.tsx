import { getDocs, root } from "./lib";
import { join } from "node:path";
import { readFileSync } from "node:fs";

export function Listing({ paths }: { paths: string[] }) {
  return (
    <ul>
      {paths.map((d) => (
        <li>
          <a href={`./${d}`}>{d}</a>
        </li>
      ))}
    </ul>
  );
}

export function DirView({ path }: { path: string }) {
  const fullpath = join(root, path);
  return (
    <>
      {path !== "/" && (
        <div>
          <a href="../">Up</a>
        </div>
      )}
      <Listing paths={getDocs(fullpath)} />
    </>
  );
}

export function FileView({ path }: { path: string }) {
  const fullpath = join(root, path);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: readFileSync(fullpath).toString(),
      }}
    />
  );
}
