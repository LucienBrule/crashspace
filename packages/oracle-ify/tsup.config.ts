import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/browser.ts', 'src/node.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  target: 'node20',
  outDir: 'dist',
  external: ['rollup', '@rollup/rollup-darwin-arm64'],
});