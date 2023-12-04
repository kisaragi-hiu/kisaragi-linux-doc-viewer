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
  const paths = getDocs(fullpath);
  const fileShown =
    paths.length === 1
      ? paths[0]
      : paths.find((path) => path.match(/^readme(\.|$)/i));
  return (
    <>
      {path !== "/" && (
        <div>
          <a href="../">Up</a>
        </div>
      )}
      <Listing paths={paths} />
      {fileShown && <FileView path={join(path, fileShown)} />}
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
