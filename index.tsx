import { render } from "preact-render-to-string";
import type { VNode } from "preact";
import { lstatSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { DirView, FileView } from "./components";
import { root } from "./lib";

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
      const stat = lstatSync(join(root, path));
      if (stat.isFile()) {
        return Page(FileView({ path }), false);
      } else {
        if (path.at(-1) === "/") {
          return Page(DirView({ path }));
        } else {
          return Response.redirect(path + "/", 307);
        }
      }
    }
  },
});
