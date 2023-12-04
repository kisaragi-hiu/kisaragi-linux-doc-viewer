import { readdir } from "node:fs/promises";
import { render } from "preact-render-to-string";

async function ListDocs() {
  const docs = (await readdir("/usr/share/doc")).sort((a, b) => {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  });
  return (
    <ul>
      {docs.map((d) => (
        <li>{d}</li>
      ))}
    </ul>
  );
}

// static file server
Bun.serve({
  port: 4003,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response(render(await ListDocs()), {
        headers: { "Content-Type": "text/html" },
      });
    }
    return new Response(url.pathname);
  },
});
