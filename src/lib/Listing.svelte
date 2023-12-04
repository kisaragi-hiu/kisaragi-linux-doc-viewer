<script lang="ts">
  import * as path from "node:path";
  export let paths: string[];
</script>

<ul>
  {#each paths as d}
    <li><a href={d}>{path.basename(d)}</a></li>
  {/each}
</ul>
