import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      fileName: 'index.es.js',
      formats: ['es'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        'antd',
        'vitis-lowcode-types'
      ],
    },
  },
});
