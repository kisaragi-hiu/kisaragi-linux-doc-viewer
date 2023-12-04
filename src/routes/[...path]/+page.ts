import { root } from "$lib";
import { redirect } from "@sveltejs/kit";
import { join } from "node:path";

export function load({ params }) {
  const path = join("/", params.path);
  console.log(path);
  if (path.startsWith(root) && path !== root) {
    return { path: path };
  } else {
    throw redirect(307, "/");
  }
}
