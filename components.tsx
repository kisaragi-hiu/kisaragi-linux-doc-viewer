import { getDocs, root, header } from "./lib";
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
  const atRoot = path === "/";
  return (
    <>
      <h3>{atRoot ? header : fullpath}</h3>
      <Listing paths={atRoot ? paths : ["../", ...paths]} />
      {readme && (
        <>
          <h6>{basename(readme)}</h6>
          <hr />
          <FileView path={join(path, readme)} />
        </>
      )}
    </>
  );
}

export function FileView({ path }: { path: string }) {
  const fullpath = join(root, path);
  const filetype = Bun.file(fullpath).type;
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
    return <pre>{fileStr}</pre>;
  }
}
