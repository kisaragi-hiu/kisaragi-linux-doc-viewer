<script>
  export let data;
  import DirView from "$lib/DirView.svelte";
  import FileView from "$lib/FileView.svelte";

  import { lstatSync } from "node:fs";
  const path = data.path;
  const stat = lstatSync(path);
</script>

{#if stat.isFile()}
  <FileView {path} />
{:else}
  <DirView {path} />
{/if}
