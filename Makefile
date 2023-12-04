sync:
	bunx svelte-kit sync

dev: sync
	bunx vite dev

build: sync
	bunx vite build

preview: sync
	bunx vite preview

check: sync
	bunx svelte-check --tsconfig ./tsconfig.json

check.watch: sync
	bunx svelte-check --tsconfig ./tsconfig.json --watch
