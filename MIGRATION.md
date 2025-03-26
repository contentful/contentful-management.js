<!-- shared header  START -->

<p align="center">
  <a href="https://www.contentful.com/developers/docs/references/content-management-api/">
    <img alt="Contentful Logo" title="Contentful" src="images/contentful-icon.png" width="150">
  </a>
</p>

<h1 align='center'>Content Management API</h1>

<h3 align="center">Migration</h3>

<p align="center">
  <a href="README.md">Readme</a> · 
  <a href="MIGRATION.md">Migration</a> · · 
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

<p align="center">
  <a href="https://www.contentful.com/slack/">
    <img src="https://img.shields.io/badge/-Join%20Community%20Slack-2AB27B.svg?logo=slack&maxAge=31557600" alt="Join Contentful Community Slack">
  </a>
</p>

<!-- shared header  END -->

# Migration information

- [Migration information](#migration-information)
  - [Migration to version 12.x](#migration-to-version-12x)
    - [Breaking changes](#breaking-changes)
      - [Node.js core modules](#nodejs-core-modules)
      - [Pre-bundled code](#pre-bundled-code)
        - [Webpack 5](#webpack-5)
        - [Rollup](#rollup)
    - [Improvements](#improvements)
      - [Tree shaking](#tree-shaking)
      - [Module support and package configuration](#module-support-and-package-configuration)
      - [Testing framework](#testing-framework)
  - [Security](#security)
    - [Removal of eval](#removal-of-eval)

From version 3.0.0 onwards, you can access documentation for a specific version by visiting `https://contentful.github.io/contentful.js/contentful/<VERSION>`.

You can upgrade to a major version using `npm update contentful`

## Migration to version 12.x

Version 12.0.0 introduces full ESM support by default, with CJS variants still available for legacy environments. This version is a significant step forward in modernizing our build and improving performance while maintaining wide compatibility across various environments.

### Breaking changes

#### Node.js core modules

We no longer bundle Node.js core modules. If you’re bundling for the browser, you may need to configure your bundler to provide fallbacks or empty functions, particularly for the fs module. This change was introduced in version 12.x and may affect projects using Node.js-specific modules in the browser.

#### Pre-bundled code

Pre-bundled code for Node.js is no longer provided. If your setup relies on pre-bundled packages, you may need to adjust your build configuration.

##### Webpack 5

To make our project bundle properly for the browser with Webpack 5, you need to add this to your configuration:

```js
module.exports = {
  resolve: {
    fallback: {
      os: false,
      zlib: false,
      tty: false,
    },
  },
}
```

##### Rollup

To make our project bundle properly for the browser with Rollup, you need to add this to your configuration:

```js
nodeResolve({ browser: true, preferBuiltins: false })
```

### Improvements

#### Tree shaking

Tree shaking is significantly improved, ensuring that only the necessary parts of the library are included in your final bundle.
Smaller browser bundles

Browser bundle sizes have been reduced by nearly threefold, from 128KB to 45KB, contributing to faster load times and improved performance.

#### Module support and package configuration

The package now uses "type": "module" in package.json to define the default module format as ESM, while also providing support for CJS through the exports field. This allows us to support a wide range of environments including Node.js (with and without TypeScript, both CJS and ESM), AngularJS, GatsbyJS, Next.js, Nuxt, React Native (Expo), Rollup, Svelte, Vite, Webpack, and more.

#### Testing framework

We’ve migrated our internal test environment from Jest to Vitest, aligning with modern testing frameworks and tools.

## Security

### Removal of eval

We have completely removed the use of eval in our exported code, improving security and compatibility with strict environments.
