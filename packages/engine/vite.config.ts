import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path, { resolve } from 'path';
import { vitePluginBuildEntry } from './scripts/vite-plugin-separate-build'

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
    }),
    vitePluginBuildEntry({
      canvas: resolve(__dirname, "./scripts/canvas-vite.config.ts")
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: (format) => `index.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        'antd',
        '@ant-design/icons',
        'vitis-lowcode-default-ext',
        'vitis-lowcode-types',
        'vitis-lowcode-renderer'
      ],
    },
  },
});
