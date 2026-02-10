import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'index.es.js',
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: true, // 合并类型定义文件
    }),
  ],
});
