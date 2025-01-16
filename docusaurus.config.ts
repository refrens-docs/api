import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

console.log(process.env.NODE_ENV);

const REPO_NAME = 'api';
const ORG_NAME = 'refrens-docs';

const config: Config = {
  title: 'Refrens Documentation',
  tagline: 'Docs, API refrences and more',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: `https://${ORG_NAME}.github.io`,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: ORG_NAME, // Usually your GitHub org/user name.
  projectName: REPO_NAME, // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',
  deploymentBranch: 'gh-pages',
  onBrokenMarkdownLinks: 'warn',
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `https://github.com/${ORG_NAME}/${REPO_NAME}`,
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.png',
    navbar: {
      title: 'Refrens Documentation',
      logo: {
        alt: 'Refrens Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: `https://github.com/${ORG_NAME}`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
