import { render } from "preact-render-to-string";
import type { VNode } from "preact";
import { lstatSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import { DirView, FileView } from "./components";
import { root, redirect } from "./lib";

function Page(vnode: VNode<{}>, styled = true) {
  return new Response(
    "<!DOCTYPE html>" +
      render(
        <>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            {styled && (
              <style>
                {readFileSync(
                  "./node_modules/sakura.css/css/sakura.css",
                ).toString()}
              </style>
            )}
          </head>
          <body>{vnode}</body>
        </>,
      ),
    {
      headers: { "Content-Type": "text/html" },
    },
  );
}

// static file server
Bun.serve({
  port: 4003,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    if (path === "/") {
      return Page(DirView({ path: "/" }));
    } else if (path === root) {
      return Response.redirect("/", 307);
    } else {
      const fullpath = join(root, path);
      const stat = lstatSync(fullpath);
      if (stat.isDirectory()) {
        // Path trailing slash normalization
        if (path.at(-1) !== "/") {
          return redirect(path + "/");
        }
        // Redirect to index.html
        if (existsSync(join(fullpath, "index.html"))) {
          return redirect(join(path, "index.html"));
        }
        return Page(DirView({ path }));
      } else {
        const file = Bun.file(fullpath);
        if (
          ["text/plain", "text/markdown", "application/octet-stream"].includes(
            file.type,
          )
        ) {
          return Page(
            <>
              {path !== "/" && (
                <div>
                  <a href="./">Up</a>
                </div>
              )}
              <FileView path={path} filetype={file.type} />
            </>,
          );
        }
        // console.log(`${fullpath} is ${file.type}`);
        return new Response(file);
      }
    }
  },
});
