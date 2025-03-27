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

- [Getting started](#getting-started)
  - [Installation](#installation)
    - [Node:](#node)
    - [Browser:](#browser)
  - [Typings](#typings)
  - [Authentication](#authentication)
  - [Using ES6 import](#using-es6-import)
  - [Using the Plain Client](#using-the-plain-client)
    - [With scoped space and environment](#with-scoped-space-and-environment)
  - [Using the Legacy Client](#using-the-legacy-client)
  - [App Framework](#app-framework)
  - [Troubleshooting](#troubleshooting)
  - [Documentation/References](#documentationreferences)
    - [REST API reference with examples](#rest-api-reference-with-examples)
    - [Reference documentation](#reference-documentation)
    - [Configuration](#configuration)
      - [Request configuration options](#request-configuration-options)
    - [Tutorials \& other resources](#tutorials--other-resources)
  - [Versioning](#versioning)
  - [Reach out to us](#reach-out-to-us)
    - [You have questions about how to use this library?](#you-have-questions-about-how-to-use-this-library)
    - [You found a bug or want to propose a feature?](#you-found-a-bug-or-want-to-propose-a-feature)
    - [You need to share confidential information or have other questions?](#you-need-to-share-confidential-information-or-have-other-questions)
  - [Get involved](#get-involved)
  - [License](#license)
  - [Code of Conduct](#code-of-conduct)

<!-- /TOC -->
</details>

## Features

- Content management and retrieval through Contentful's [Content Management API](https://www.contentful.com/developers/docs/references/content-management-api/).
- Built in rate limiting with recovery procedures
- Asset processing helpers
- Two different types of clients:
  - [Plain Client](#using-the-plain-client)
  - [Legacy Chainable Client ](#using-the-legacy-client)

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

## Typings

This library includes TypeScript typings out of the box.

## Authentication

To get content from Contentful, an app should authenticate with an OAuth bearer token.

If you want to use this library for a simple tool or a local app that you won't redistribute or make available to other users, you can get an API key for the Management API at our [Authentication page](https://www.contentful.com/developers/docs/references/authentication/).

If you'd like to create an app which would make use of this library but that would be available for other users, where they could authenticate with their own Contentful credentials, make sure to also check out the section about [Creating an OAuth Application](https://www.contentful.com/developers/docs/references/authentication/#creating-an-oauth-20-application)

## Using ES6 import

You can import the library using ES6 syntax as follows:

```js
// import createClient directly
import contentful from 'contentful-management'
const client = contentful.createClient(
  {
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: 'YOUR_ACCESS_TOKEN',
  },
  { type: 'plain' }
)
//....
```

## Using the Plain Client

Beginning with `contentful-management@7` this library provides a client which exposes all CMA endpoints in a simple flat API surface, as opposed to the waterfall structure exposed by legacy versions of the SDK.

```javascript
const contentful = require('contentful-management')
const plainClient = contentful.createClient(
  {
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
```

### With scoped space and environment

```javascript
const scopedPlainClient = contentful.createClient(
  {
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

You can try and change the above example on [Runkit](https://npm.runkit.com/contentful-management).

The benefits of using the "plain" version of the client, over the legacy version, are:

- The ability to reach any possible CMA endpoint without the necessity to call any async functions beforehand.
  - It's especially important if you're using this CMA client for non-linear scripts (for example, a complex Front-end application)
- All returned objects are simple Javascript objects without any wrappers. They can be easily serialized without an additional `toPlainObject` function call.
- The ability to scope CMA client instance to a specific `spaceId`, `environmentId`, and `organizationId` when initializing the client.
  - You can pass a concrete values to `defaults` and omit specifying these params in actual CMA methods calls.

## Using the Legacy Client

The following code snippet is an example of the legacy client interface, which reads and writes data as a sequence of nested requests:

```js
const contentful = require('contentful-management')
const client = contentful.createClient({
  accessToken: 'YOUR_ACCESS_TOKEN',
})

// Get a space with the specified ID
client.getSpace('spaceId').then((space) => {
  // Get an environment within the space
  space.getEnvironment('master').then((environment) => {
    // Get entries from this environment
    environment.getEntries().then((entries) => {
      console.log(entries.items)
    })
    // Get a content type
    environment.getContentType('product').then((contentType) => {
      // Update its name
      contentType.name = 'New Product'
      contentType.update().then((updatedContentType) => {
        console.log('Update was successful')
      })
    })
  })
})
```

## App Framework

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

To help you get the most out of this library, we've prepared full client configuration options, reference documentation, tutorials, and other examples to help you learn and understand how to use this library effectively.

- [REST API reference with examples](#rest-api-reference-with-examples)
- [Configuration](#configuration)
- [Reference documentation](#reference-documentation)
- [Tutorials & other resources](#tutorials--other-resources)

### REST API reference with examples

This library is a wrapper around the [Contentful Management REST API](https://www.contentful.com/developers/docs/references/content-management-api/).

You can use the API reference to find full, copy-paste-ready examples for both the **plain** and **legacy** clients of this library.  
[For example, here’s how to create, update, publish, or fetch an entry](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/entries/entry).

It’s your go-to resource for:

- Quickly grabbing example snippets for specific operations in the Contentful Management API
- Complete and detailed endpoint descriptions
- Previewing request and response payloads
- Understanding query filters and pagination

### Reference documentation

The [Contentful JS SDK TypeDoc reference](https://contentful.github.io/contentful-management.js) documents all exported objects, types, functions, and instance methods.

> From version `1.0.0` onward, access version-specific docs at  
> `https://contentful.github.io/contentful-management.js/contentful-management/<VERSION>`

---

### Configuration

The `createClient` method accepts several options to configure the client behavior:

```js
contentful.createClient({
  ...your config here...
})
```

```js
// The plain client accepts the same configuration options
contentful.createClient(
  {
   ...your config here...
  },
  { type: 'plain' }
)
```

#### Request configuration options

| Name             | Default                          | Description                                                                                                                                                                                                                                                                                                          |
| ---------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessToken`    |                                  | **Required** (unless using `apiAdapter`). Your CMA access token.                                                                                                                                                                                                                                                     |
| `host`           | `'api.contentful.com'`           | The base host used for API requests.                                                                                                                                                                                                                                                                                 |
| `hostUpload`     | `'upload.contentful.com'`        | The host used for upload-related API requests.                                                                                                                                                                                                                                                                       |
| `basePath`       | `''`                             | Appended to the host. Useful for custom gateways/proxies like `https://gateway.example.com/contentful/`.                                                                                                                                                                                                             |
| `httpAgent`      | `undefined`                      | Custom HTTP agent. See [Axios request config](https://github.com/axios/axios#request-config).                                                                                                                                                                                                                        |
| `httpsAgent`     | `undefined`                      | Custom HTTPS agent. See [Axios request config](https://github.com/axios/axios#request-config).                                                                                                                                                                                                                       |
| `headers`        | `{}`                             | Additional headers for all requests. The SDK automatically sets:<br>• `Content-Type: application/vnd.contentful.management.v1+json`<br>• `X-Contentful-User-Agent: sdk contentful-management.js/x.y.z; platform ...; os ...`                                                                                         |
| `proxy`          | `undefined`                      | Axios proxy configuration. See [Axios request config](https://github.com/axios/axios#request-config).                                                                                                                                                                                                                |
| `retryOnError`   | `true`                           | Retries requests on `500` or `429` responses. Set to `false` to disable retry behavior.                                                                                                                                                                                                                              |
| `throttle`       | `0`                              | Max requests per second:<br>• Fixed: `1`–`30`<br>• `'auto'`: based on your plan<br>• `'0%'`–`'100%'`: percentage-based rate based on plan limit                                                                                                                                                                      |
| `application`    | `undefined`                      | Custom application identifier, e.g. `'myApp/version'`. Added to the `X-Contentful-User-Agent` header.                                                                                                                                                                                                                |
| `integration`    | `undefined`                      | Custom integration identifier, e.g. `'react/version'`. Added to the `X-Contentful-User-Agent` header.                                                                                                                                                                                                                |
| `timeout`        | `30000`                          | Timeout in milliseconds for requests.                                                                                                                                                                                                                                                                                |
| `retryLimit`     | `5`                              | Maximum number of retry attempts for recoverable errors.                                                                                                                                                                                                                                                             |
| `logHandler`     | `function (level, data) {}`      | Custom log handler for SDK logs (errors, warnings, info). Defaults to console logging.                                                                                                                                                                                                                               |
| `requestLogger`  | `function (config) {}`           | Called before each request. Receives the Axios request config. No-op by default.                                                                                                                                                                                                                                     |
| `responseLogger` | `function (response) {}`         | Called after each response. Receives the Axios response object. No-op by default.                                                                                                                                                                                                                                    |
| `apiAdapter`     | `new RestAdapter(configuration)` | Custom adapter that overrides request handling.<br>👉 [View adapter source](https://github.com/contentful/contentful-management.js/blob/b50534c629a8ddc81637170a07bc63477d136cec/lib/adapters/REST/rest-adapter.ts)<br><br>**Note**: Takes full control of requests. Must handle headers, host, and auth internally. |

### Tutorials & other resources

Check out the [Contentful for JavaScript](https://www.contentful.com/developers/docs/javascript/) page for:

- Hands-on tutorials
- Example applications
- Integration guides for frameworks and tools

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
