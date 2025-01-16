[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm i
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Creating Docs

Create a new mdx file inside `docs/` folder. MDX is just markdown with support for React components. Learn more [here](https://docusaurus.io/docs/markdown-features/react)

Docusaurus provides a list of components which you can use by importing them. The list can be viewed [here](https://docusaurus.io/docs/markdown-features#standard-features)

Certain components like `Tabs`, `TabItem`, are made available globally. You don't have to import them. You can make components available globally by exporting them from `MDXComponents.ts` file. Lear more [here](https://docusaurus.io/docs/markdown-features/react#mdx-component-scope)

### Deployment

Using SSH:

```
$ npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
