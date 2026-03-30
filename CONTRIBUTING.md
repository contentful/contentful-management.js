<!-- shared header  START -->

<p align="center">
  <a href="https://www.contentful.com/developers/docs/references/content-management-api/">
    <img alt="Contentful Logo" title="Contentful" src="images/contentful-icon.png" width="150">
  </a>
</p>

<h1 align='center'>Content Management API</h1>

<h3 align="center">JavaScript</h3>

<p align="center">
  <a href="README.md">Readme</a> · 
  <a href="SETUP.md">Setup</a> · 
  <a href="MIGRATION.md">Migration</a> · 
  <a href="CHANGELOG.md">Changelog</a> · 
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

<p align="center">
  <a href="https://www.contentful.com/slack/">
    <img src="https://img.shields.io/badge/-Join%20Community%20Slack-2AB27B.svg?logo=slack&maxAge=31557600" alt="Join Contentful Community Slack">
  </a>
</p>

<!-- shared header  END -->

We appreciate any community contributions to this project, whether in the form of issues or Pull Requests.

This document outlines the we'd like you to follow in terms of commit messages and code style.

It also explains what to do in case you want to setup the project locally and run tests.

# Setup

This project is written in TypeScript. Sources live in `lib/` and are bundled to `dist/` (ESM, CJS, types, browser) using Rollup.

Run `npm install` to install all necessary dependencies. All tools can be accessed via npm scripts — there is no need to install anything globally.

If you have a `dist` directory from a previous build, run `npm run clean`.

# Code style

This project uses ESLint and Prettier. Run `npm run lint` to check and `npm run prettier:write` to format.

Follow a style similar to the existing code.

# Commit messages and issues

This project uses the [Angular JS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit), via semantic-release. See the semantic-release [Default Commit Message Format](https://github.com/semantic-release/semantic-release#default-commit-message-format) section for more details.

# Running tests

This project has unit, type, and integration tests, powered by Vitest.

- `npm test` runs the full test suite (unit + types + integration + size)
- `npx vitest --project unit --run` runs unit tests
- `npx vitest --project types --run` runs type tests
- `npm run test:integration` runs integration tests against the Contentful CMA API. These run against a real Contentful org, so focus on unit tests during development — integration tests run as part of CI/CD.

# Documentation

Code is documented using [TypeDoc](https://typedoc.org/), and reference documentation is published automatically to GitHub Pages with each release.

- `npm run docs:build` generates documentation into `out/`
- `npm run docs:dev` builds documentation in watch mode

# Other tasks

- `npm run clean` removes built files
- `npm run build` builds all bundles (ESM, CJS, types, browser) via Rollup
