<script lang="ts">
  export let path: string;
  import { readFileSync } from "node:fs";
</script>

{@html readFileSync(path)}
