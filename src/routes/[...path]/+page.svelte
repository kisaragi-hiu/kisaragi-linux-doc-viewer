<script>
  export let data;
  import { readFileSync, readdirSync, lstatSync } from "node:fs";
  import { join } from "node:path";
  const file = join("/", data.path);
  const stat = lstatSync(file);
</script>

{#if stat.isFile(file)} {@html readFileSync(file)} {:else}
<div>
  <a href="/">Back</a>
</div>

<div>{readdirSync(file)}</div>
{/if}
