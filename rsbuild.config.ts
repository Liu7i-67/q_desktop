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
          // 给html添加lang=zh-CN属性
          lang: 'zh-CN',
        },
      },
    ],
  },
  source: {
    entry: {
      // 指定入口文件
      index: './src/ui/index.tsx',
    },
  },
  output: {
    distPath: {
      // 指定输出目录
      root: 'dist/web',
    },
    // 指定资源路径前缀
    assetPrefix: './',
  },
  resolve: {
    // 配置别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
