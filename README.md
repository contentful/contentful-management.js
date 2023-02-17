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

## Introduction

[![Build Status](https://circleci.com/gh/contentful/contentful-management.js.svg?style=svg)](https://circleci.com/gh/contentful/contentful-management.js)
[![npm](https://img.shields.io/npm/v/contentful-management.svg)](https://www.npmjs.com/package/contentful-management)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm downloads](https://img.shields.io/npm/dm/contentful-management.svg)](http://npm-stat.com/charts.html?package=contentful-management)
[![gzip bundle size](http://img.badgesize.io/https://unpkg.com/contentful-management/dist/contentful-management.browser.min.js?compression=gzip)](https://unpkg.com/contentful-management/dist/contentful-management.browser.min.js)

**What is Contentful?**

[Contentful](https://www.contentful.com) provides a content infrastructure for digital teams to power content in websites, apps, and devices. Unlike a CMS, Contentful was built to integrate with the modern software stack. It offers a central hub for structured content, powerful management and delivery APIs, and a customizable web app that enable developers and content creators to ship digital products faster.

<details>
<summary>Table of contents</summary>

<!-- TOC -->

- [Features](#features)
- [Supported Environments](#supported-environments)
- [Getting Started](#getting-started)
  - [Installation](#installation)
    - [Node](#node-)
    - [Browser](#browser-)
    - [Typings](#typings)
  - [Authentication](#authentication)
  - [Using ES6 import](#using-es6-import)
  - [Your first Request](#your-first-request)
  - [Alternative plain API](#alternative-plain-api)
- [App Framework](#app-framework)
- [Troubleshooting](#troubleshooting)
- [Documentation/References](#documentationreferences)
  - [Configuration](#configuration)
  - [Reference Documentation](#reference-documentation)
  - [Contentful Javascript resources](#contentful-javascript-resources)
  - [REST API reference](#rest-api-reference)
- [Versioning](#versioning)
- [Reach out to us](#reach-out-to-us)
- [Get involved](#get-involved)
- [License](#license)
- [Code of Conduct](#code-of-conduct)

<!-- /TOC -->
</details>

## Features

- Content management and retrieval through Contentful's [Content Management API](https://www.contentful.com/developers/docs/references/content-management-api/).
- Built in rate limiting with recovery procedures
- Asset processing helpers

## Supported environments

Browsers and Node.js:

- Chrome
- Firefox
- Edge
- Safari
- node.js (LTS)

Other browsers should also work, but at the moment we're only running automated tests on the browsers and Node.js versions specified above.

# Getting started

To get started with the Contentful Management JS library you'll need to install it, and then get credentials which will allow you to access your content in Contentful.

- [Installation](#installation)
- [Authentication](#authentication)
- [Using ES6 import](#using-es6-import)
- [Your first request](#your-first-request)
- [Troubleshooting](#troubleshooting)
- [Documentation/References](#documentationreferences)

## Installation

### Node:

Using [npm](http://npmjs.org):

```sh
npm install contentful-management
```

Using [yarn](https://yarnpkg.com/lang/en/):

```sh
yarn add contentful-management
```

### Browser:

For browsers, we recommend to download the library via npm or yarn to ensure 100% availability.

If you'd like to use a standalone built file you can use the following script tag or download it from [jsDelivr](https://www.jsdelivr.com/package/npm/contentful-management), under the `dist` directory:

```html
<script src="https://cdn.jsdelivr.net/npm/contentful-management@latest/dist/contentful-management.browser.min.js"></script>
```

**It's not recommended to use the above URL for production.**

Using `contentful@latest` will always get you the latest version, but you can also specify a specific version number:

```html
<!-- Avoid using the following url for production. You can not rely on its availability. -->
<script src="https://cdn.jsdelivr.net/npm/contentful-management@7.3.0/dist/contentful-management.browser.min.js"></script>
```

The Contentful Management library will be accessible via the `contentfulManagement` global variable.

Check the [releases](https://github.com/contentful/contentful-management.js/releases) page to know which versions are available.

### Typings

This library also comes with typings to use with typescript.

## Authentication

To get content from Contentful, an app should authenticate with an OAuth bearer token.

If you want to use this library for a simple tool or a local app that you won't redistribute or make available to other users, you can get an API key for the Management API at our [Authentication page](https://www.contentful.com/developers/docs/references/authentication/).

If you'd like to create an app which would make use of this library but that would be available for other users, where they could authenticate with their own Contentful credentials, make sure to also check out the section about [Creating an OAuth Application](https://www.contentful.com/developers/docs/references/authentication/#creating-an-oauth-20-application)

## Using ES6 import

You can use the es6 import with the library as follow

```js
// import createClient directly
import contentful from 'contentful-management'
const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: 'YOUR_ACCESS_TOKEN',
})
//....
```

## Your first request

The following code snippet is the most basic one you can use to get content from Contentful with this library:

```js
const contentful = require('contentful-management')
const client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: 'YOUR_ACCESS_TOKEN',
})

// This API call will request a space with the specified ID
client.getSpace('spaceId').then((space) => {
  // This API call will request an environment with the specified ID
  space.getEnvironment('master').then((environment) => {
    // Now that we have an environment, we can get entries from that space
    environment.getEntries().then((entries) => {
      console.log(entries.items)
    })

    // let's get a content type
    environment.getContentType('product').then((contentType) => {
      // and now let's update its name
      contentType.name = 'New Product'
      contentType.update().then((updatedContentType) => {
        console.log('Update was successful')
      })
    })
  })
})
```

You can try and change the above example at [Tonic](https://tonicdev.com/npm/contentful-management).

### Alternative plain API

Starting `contentful-management@7` this library provides an alternative plain client which exposes all CMA endpoints in a simple flat manner oppose to a default waterfall structure.

```javascript
const contentful = require('contentful-management')
const plainClient = contentful.createClient(
  {
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: 'YOUR_ACCESS_TOKEN',
  },
  { type: 'plain' }
)

const environment = await plainClient.environment.get({
  spaceId: '<space_id>',
  environmentId: '<environment_id>',
})

const entries = await plainClient.entry.getMany({
  spaceId: '123',
  environmentId: '',
  query: {
    skip: 10,
    limit: 100,
  },
})

// With scoped space and environment
const scopedPlainClient = contentful.createClient(
  {
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: 'YOUR_ACCESS_TOKEN',
  },
  {
    type: 'plain',
    defaults: {
      spaceId: '<space_id>',
      environmentId: '<environment_id>',
    },
  }
)

// entries from '<space_id>' & '<environment_id>'
const entries = await scopedPlainClient.entry.getMany({
  query: {
    skip: 10,
    limit: 100,
  },
})
```

The benefits of using the plain version of the library are:

- The ability to reach any possible CMA endpoint without the necessity to call any async functions beforehand.
  - It's especially important if you're using this CMA client for non-linear scripts (for example, a complex Front-end application)
- All returned objects are simple Javascript objects without any wrappers. They can be easily serialized without an additional `toPlainObject` function call.
- The ability to scope CMA client instance to a specific `spaceId`, `environmentId`, and `organizationId` when initializing the client.
  - You can pass a concrete values to `defaults` and omit specifying these params in actual CMA methods calls.

### App Framework

Starting [`@contentful/app-sdk@4`](https://github.com/contentful/app-sdk) you can use this client to make requests
from your [apps built for Contentful](https://www.contentful.com/developers/docs/extensibility/app-framework/).

A dedicated [Adapter](https://github.com/contentful/contentful-management.js/blob/2350b47053459694b21b19c71025632fe57815cc/lib/common-types.ts#L493-L495)
grants your apps access to the supported space-environment scoped entities without compromising on security as you won't
need to expose a management token, and without coding any additional backend middleware.

```javascript
const contentfulApp = require('@contentful/app-sdk')
const contentful = require('contentful-management')

contentfulApp.init((sdk) => {
  const cma = contentful.createClient(
    { apiAdapter: sdk.cmaAdapter },
    {
      type: 'plain',
      defaults: {
        environmentId: sdk.ids.environmentAlias ?? sdk.ids.environment,
        spaceId: sdk.ids.space,
      },
    }
  )

  // ...rest of initialization code
})
```

> **Please Note**
>
> Requests issued by the App SDK adapter will count towards the same rate limiting quota as the ones made by other APIs
> exposed by App SDK (e.g., Space API). Ultimately, they will all fall into the same bucket as the calls performed by
> the host app (i.e., Contentful web app, Compose, or Launch).

## Troubleshooting

- **I can't Install the package via npm** - Check your internet connection - It is called `contentful-management` and not `contenful-management` ¯\\\_(ツ)\_/¯
- **Can I use the library in react native projects** - Yes it is possible
- **I get the error: Unable to resolve module `http`** - Our library is supplied as node and browser version. Most non-node environments, like React Native, act like a browser. To force using of the browser version, you can require it via: `const { createClient } = require('contentful-management/dist/contentful-management.browser.min.js')`
- **I am not sure what payload to send when creating and entity (Asset/Entity/ContentType etc...)** - Check the Content Management API [docs](https://www.contentful.com/developers/docs/references/content-management-api/) or the examples in the reference [docs](https://contentful.github.io/contentful-management.js) - Feel free to open an issue if you didn't find what you need in the above links
- 😱 **something is wrong what should I do** - If it is a bug related to the code create a GitHub issue and make sure to remove any credential for your code before sharing it. - If you need to share your credentials, for example you have an issue with your space, please create a support ticket. - Please **do not** share your management token in a GitHub issue

## Documentation/References

To help you get the most out of this library, we've prepared reference documentation, tutorials and other examples that will help you learn and understand how to use this library.

### Configuration

The `createClient` method supports several options you may set to achieve the expected behavior:

```js
contentful.createClient({
  ... your config here ...
})
```

#### accessToken (required, when `apiAdapter` is not set)

Your CMA access token.

#### host (default: `'api.contentful.com'`)

Set the host used to build the request URI's.

#### hostUpload (default: `'upload.contentful.com'`)

Set the host used to build the upload related request uri's.

#### basePath (default: ``)

This path gets appended to the host to allow request urls like `https://gateway.example.com/contentful/` for custom gateways/proxies.

#### httpAgent (default: `undefined`)

Custom agent to perform HTTP requests. Find further information in the [axios request config documentation](https://github.com/mzabriskie/axios#request-config).

#### httpsAgent (default: `undefined`)

Custom agent to perform HTTPS requests. Find further information in the [axios request config documentation](https://github.com/mzabriskie/axios#request-config).

#### headers (default: `{}`)

Additional headers to attach to the requests. We add/overwrite the following headers:

- Content-Type: `application/vnd.contentful.management.v1+json`
- X-Contentful-User-Agent: `sdk contentful-management.js/1.2.3; platform node.js/1.2.3; os macOS/1.2.3`
  (Automatically generated)

#### proxy (default: `undefined`)

Axios proxy configuration. See the [axios request config documentation](https://github.com/mzabriskie/axios#request-config) for further information about the supported values.

#### retryOnError (default: `true`)

By default, this library is retrying requests which resulted in a 500 server error and 429 rate limit response. Set this to `false` to disable this behavior.

#### logHandler (default: `function (level, data) {}`)

Errors and warnings will be logged by default to the node or browser console. Pass your own log handler to intercept here and handle errors, warnings and info on your own.

#### requestLogger (default: `function (config) {}`)

Interceptor called on every request. Takes Axios request config as an arg. Default does nothing. Pass your own function to log any desired data.

#### responseLogger (default: `function (response) {}`)

Interceptor called on every response. Takes Axios response object as an arg. Default does nothing. Pass your own function to log any desired data.

#### apiAdapter (default: `new RestAdapter(configuration)`)

An [`Adapter`](https://github.com/contentful/contentful-management.js/blob/2350b47053459694b21b19c71025632fe57815cc/lib/common-types.ts#L493-L495)
that can be utilized to issue requests. It defaults to a [`RestAdapter`](https://github.com/contentful/contentful-management.js/blob/b50534c629a8ddc81637170a07bc63477d136cec/lib/adapters/REST/rest-adapter.ts)
initialized with provided configuration.

> **Please Note**
>
> The Adapter will take precedence over the other options. Therefore, ensure you're providing the Adapter all the
> information it needs to issue the request (e.g., host or auth headers)

#### throttle (default: `0`)

Maximum number of requests per second.

- `1`-`30` (fixed number of limit),
- `'auto'` (calculated limit based on your plan),
- `'0%'` - `'100%'` (calculated % limit based on your plan)

### Reference documentation

The [Contentful's JS library reference](https://contentful.github.io/contentful-management.js) documents what objects and methods are exposed by this library, what arguments they expect and what kind of data is returned.

Most methods also have examples which show you how to use them.

You can start by looking at the top level `contentfulManagement` namespace.

The `ContentfulClientAPI` namespace defines the methods at the Client level which allow you to create and get spaces.

The `ContentfulSpaceAPI` namespace defines the methods at the Space level which allow you to create and get entries, assets, content types and other possible entities.

The `Entry`, `Asset` and `ContentType` namespaces show you the instance methods you can use on each of these entities, once you retrieve them from the server.

> From version 1.0.0 onwards, you can access documentation for a specific version by visiting `https://contentful.github.io/contentful-management.js/contentful-management/<VERSION>`

### Contentful JavaScript resources

Read the [Contentful for JavaScript](https://www.contentful.com/developers/docs/javascript/) page for Tutorials, Demo Apps, and more information on other ways of using JavaScript with Contentful

### REST API reference

This library is a wrapper around our Contentful Management REST API. Some more specific details such as search parameters and pagination are better explained on the [REST API reference](https://www.contentful.com/developers/docs/references/content-management-api/), and you can also get a better understanding of how the requests look under the hood.

## Versioning

This project strictly follows [Semantic Versioning](http://semver.org/) by use of [semantic-release](https://github.com/semantic-release/semantic-release).

This means that new versions are released automatically as fixes, features or breaking changes are released.

You can check the changelog on the [releases](https://github.com/contentful/contentful-management.js/releases) page.

## Reach out to us

### You have questions about how to use this library?

- Reach out to our community
  forum: [![Contentful Community Forum](https://img.shields.io/badge/-Join%20Community%20Forum-3AB2E6.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MiA1OSI+CiAgPHBhdGggZmlsbD0iI0Y4RTQxOCIgZD0iTTE4IDQxYTE2IDE2IDAgMCAxIDAtMjMgNiA2IDAgMCAwLTktOSAyOSAyOSAwIDAgMCAwIDQxIDYgNiAwIDEgMCA5LTkiIG1hc2s9InVybCgjYikiLz4KICA8cGF0aCBmaWxsPSIjNTZBRUQyIiBkPSJNMTggMThhMTYgMTYgMCAwIDEgMjMgMCA2IDYgMCAxIDAgOS05QTI5IDI5IDAgMCAwIDkgOWE2IDYgMCAwIDAgOSA5Ii8+CiAgPHBhdGggZmlsbD0iI0UwNTM0RSIgZD0iTTQxIDQxYTE2IDE2IDAgMCAxLTIzIDAgNiA2IDAgMSAwLTkgOSAyOSAyOSAwIDAgMCA0MSAwIDYgNiAwIDAgMC05LTkiLz4KICA8cGF0aCBmaWxsPSIjMUQ3OEE0IiBkPSJNMTggMThhNiA2IDAgMSAxLTktOSA2IDYgMCAwIDEgOSA5Ii8+CiAgPHBhdGggZmlsbD0iI0JFNDMzQiIgZD0iTTE4IDUwYTYgNiAwIDEgMS05LTkgNiA2IDAgMCAxIDkgOSIvPgo8L3N2Zz4K&maxAge=31557600)](https://support.contentful.com/)
- Jump into our community slack
  channel: [![Contentful Community Slack](https://img.shields.io/badge/-Join%20Community%20Slack-2AB27B.svg?logo=slack&maxAge=31557600)](https://www.contentful.com/slack/)

### You found a bug or want to propose a feature?

- File an issue here on GitHub: [![File an issue](https://img.shields.io/badge/-Create%20Issue-6cc644.svg?logo=github&maxAge=31557600)](https://github.com/contentful/contentful-management.js/issues/new).
  Make sure to remove any credential from your code before sharing it.

### You need to share confidential information or have other questions?

- File a support ticket at our Contentful Customer
  Support: [![File support ticket](https://img.shields.io/badge/-Submit%20Support%20Ticket-3AB2E6.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MiA1OSI+CiAgPHBhdGggZmlsbD0iI0Y4RTQxOCIgZD0iTTE4IDQxYTE2IDE2IDAgMCAxIDAtMjMgNiA2IDAgMCAwLTktOSAyOSAyOSAwIDAgMCAwIDQxIDYgNiAwIDEgMCA5LTkiIG1hc2s9InVybCgjYikiLz4KICA8cGF0aCBmaWxsPSIjNTZBRUQyIiBkPSJNMTggMThhMTYgMTYgMCAwIDEgMjMgMCA2IDYgMCAxIDAgOS05QTI5IDI5IDAgMCAwIDkgOWE2IDYgMCAwIDAgOSA5Ii8+CiAgPHBhdGggZmlsbD0iI0UwNTM0RSIgZD0iTTQxIDQxYTE2IDE2IDAgMCAxLTIzIDAgNiA2IDAgMSAwLTkgOSAyOSAyOSAwIDAgMCA0MSAwIDYgNiAwIDAgMC05LTkiLz4KICA8cGF0aCBmaWxsPSIjMUQ3OEE0IiBkPSJNMTggMThhNiA2IDAgMSAxLTktOSA2IDYgMCAwIDEgOSA5Ii8+CiAgPHBhdGggZmlsbD0iI0JFNDMzQiIgZD0iTTE4IDUwYTYgNiAwIDEgMS05LTkgNiA2IDAgMCAxIDkgOSIvPgo8L3N2Zz4K&maxAge=31557600)](https://www.contentful.com/support/)

## Get involved

We appreciate any help on our repositories. For more details about how to contribute see our [CONTRIBUTING.md](https://github.com/contentful/contentful-management.js/blob/master/CONTRIBUTING.md) document.

## License

This repository is published under the [MIT](LICENSE) license.

## Code of Conduct

We want to provide a safe, inclusive, welcoming, and harassment-free space and experience for all participants, regardless of gender identity and expression, sexual orientation, disability, physical appearance, socioeconomic status, body size, ethnicity, nationality, level of experience, age, religion (or lack thereof), or other identity markers.

[Read our full Code of Conduct](https://www.contentful.com/developers/code-of-conduct/).
