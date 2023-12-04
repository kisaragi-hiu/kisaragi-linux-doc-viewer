<ul>
  {#each docs as d}
  <li><a href="{d}">{path.basename(d)}</a></li>
  {/each}
</ul>

<script lang="ts">
  import "sakura.css";
  import { getDocs } from "$lib";
  import * as path from "node:path";
  const docs = getDocs();
</script>
