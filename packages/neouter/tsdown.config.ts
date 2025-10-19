import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: {
    sourcemap: false,
  },
  entry: 'src/index.ts',
  platform: 'browser',
  minify: true,
  external: ['react'],
})
