import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { pluginLlms } from '@rspress/plugin-llms';
import sidebar from './sidebar.json';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  base: '/shein-api-docs/',
  lang: 'zh',
  llms: false,
  plugins: [pluginLlms()],
  title: 'SHEIN 开放平台 API 文档',
  themeConfig: {
    llmsUI: true,
    nav: [
      { text: '快速接入', link: '/quick-start' },
      { text: '接口总览', link: '/' },
    ],
    sidebar: { '/': sidebar as any },
    socialLinks: [{ icon: 'github', mode: 'link', content: 'https://github.com/MeesuMaes/shein-api-docs' }],
  },
});
