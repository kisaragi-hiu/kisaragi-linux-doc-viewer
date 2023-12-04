<script lang="ts">
  export let path: string;

  import "sakura.css";
  import { getDocs, root } from "$lib";
  import Listing from "$lib/Listing.svelte";

  const underRoot = path.startsWith(root);
</script>

{#if underRoot && path !== root}
  <div><a href="../">Up</a></div>
{/if}

<Listing paths={getDocs(path)} />
