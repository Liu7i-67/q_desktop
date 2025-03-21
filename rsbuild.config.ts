import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 5677,
  },

  html: {
    title: '奇怪的面板',
    tags: [
      {
        tag: 'html',
        attrs: {
          lang: 'zh-CN',
        },
      },
    ],
  },
  source: {
    entry: {
      main: './src/ui/index.tsx',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
