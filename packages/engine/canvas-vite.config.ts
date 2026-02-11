

import { defineConfig } from 'vite'
export default defineConfig({
  base: './',
  publicDir: false,
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 4096 * 10,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        'vitis-lowcode-renderer'
      ]
    },
    modulePreload: false,
    minify: "esbuild"
  }
})
