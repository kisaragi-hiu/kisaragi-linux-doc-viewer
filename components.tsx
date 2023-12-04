import { getDocs, root } from "./lib";
import { join } from "node:path";
import { readFileSync, lstatSync } from "node:fs";

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
  const readme = paths.find((path) => {
    // FIXME: this will fail if there is a matching directory
    return path.match(/^readme(\.|$)/i);
  });
  return (
    <>
      {path !== "/" && (
        <div>
          <a href="../">Up</a>
        </div>
      )}
      <Listing paths={paths} />
      {readme && <FileView path={join(path, readme)} />}
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
