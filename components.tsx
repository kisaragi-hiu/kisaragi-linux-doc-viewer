import { getDocs, root } from "./lib";
import { join, basename } from "node:path";
import { readFileSync, lstatSync } from "node:fs";
import { marked } from "marked";

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

export function FileView({
  path,
}: {
  path: string,
}) {
  const fullpath = join(root, path);
  const filetype = Bun.file(fullpath).type
  const fileStr = readFileSync(fullpath).toString();
  if (filetype === "text/markdown") {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(fileStr, { async: false }) as string,
        }}
      />
    );
  } else {
    return <><h5>{basename(path)}</h5><pre>{fileStr}</pre></>;
  }
}
