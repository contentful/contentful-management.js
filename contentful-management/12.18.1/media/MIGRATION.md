# Migration information

- [How to upgrade](#how-to-upgrade)
- [Migration to version 12.x](#migration-to-version-12x)
  - [Quick Summary](#quick-summary)
  - [Breaking Changes](#breaking-changes)
  - [Troubleshooting](#troubleshooting)
- [Need help?](#need-help)

## How to upgrade

To upgrade to the latest version of `contentful-management`, use your package manager and then make any necessary changes outlined in the migration guides below.

**npm:**

```bash
npm install contentful-management@latest
```

**yarn:**

```bash
yarn upgrade contentful-management@latest
```

**pnpm:**

```bash
pnpm update contentful-management@latest
```

## Migration to version 12.x

Version 12 modernizes the build pipeline of contentful-management to bring full ESM support, with CommonJS variants still available for legacy environments. This version is a significant step forward in modernizing our build and improving performance while maintaining wide compatibility across various environments.

**Estimated migration time:** Most projects can complete this migration in under 30 minutes.

### Quick Summary

If you are affected by any of the items below, follow the upgrade guides in the sections

- Projects using Node.js versions older than v20 ([Node.js v20+ support](#nodejs-v20-support))
- Projects targeting browsers that do not support ES2021 ([ESM target updated to 2021](#esm-target-updated-to-2021))
- Code directly importing old bundle paths ([New bundles available](#new-bundles-available))
- Code relying on the bundle including all dependencies ([Package bundles no longer include projects dependencies](#package-bundles-no-longer-include-projects-dependencies))
- Code using the browser bundle with direct method access ([Changes to browser bundle](#changes-to-browser-bundle))
- Code using deep imports from internal modules ([Use of new `exports` field in package.json](#use-of-new-exports-field-in-packagejson))
- TypeScript projects importing from `contentful-management/types` with older module resolution ([Importing Types from 'contentful-management/types'](#importing-types-from-contentful-managementtypes))
- Code using the `Stream` type ([Breaking Changes](#breaking-changes))
- Code using the `entry.patch` method ([Version param is now required for entry patch method](#version-param-is-now-required-for-entry-patch-method))
- Code relying on the default nested (legacy) client ([Default client changed from nested to plain](#default-client-changed-from-nested-to-plain))
- Code using the `DefaultParams` type ([DefaultParams renamed to PlainClientDefaultParams](#defaultparams-renamed-to-plainclientdefaultparams))
- Code using the `ClientParams` type ([ClientParams type removed](#clientparams-type-removed))
- Code using `ContentfulEntryApi` or other `*Api` types ([API type naming standardized](#api-type-naming-standardized))
- Code using the `alphaFeatures` option in `createClient` ([alphaFeatures option removed](#alphafeatures-option-removed))

### Breaking Changes

#### Node.js v20+ support

We dropped support for versions of Node that were no longer LTS and now support Node v20+.

**Compatibility:**

- ✅ Node.js v20+
- ❌ Node.js v18 and below

You will need to update the version of Node in your projects if it is less than v20.

#### ESM target updated to 2021

The library now targets ECMAScript 2021, and Babel transpilation for older JavaScript versions has been removed. This means modern JavaScript features like optional chaining (`?.`), nullish coalescing (`??`), and `Promise.any()` are used directly without transpilation.

**Affected environments:**

- Internet Explorer (all versions)
- Chrome < 85
- Firefox < 79
- Safari < 14
- Edge < 85
- Node.js < 14.17

Browser and Node environments that do not support ES2021 might need an additional transpilation step with Babel to continue to work.

#### New bundles available

The following old bundles have been removed:

- ./dist/contentful-management.node.js
- ./dist/es-modules/contentful-management.js
- ./dist/contentful-management.browser.js

And have been replaced with an ESM build for use in modern environments, a CommonJS build for legacy environments, and a browser bundle suitable for including directly with a script tag:

- ./dist/esm/index.mjs
- ./dist/cjs/index.cjs
- ./dist/browser/index.min.js

If you were accessing any of the previous bundles directly, you will need to update to pull from one of the new bundles.

**import example:**

```javascript
// Before
import contentful from './node_modules/contentful-management/dist/contentful-management.node.js'

// After (ESM)
import contentful from 'contentful-management'

// After (CommonJS) - still works
const contentful = require('contentful-management')
```

#### Package bundles no longer include projects dependencies

The old 'contentful-management.node.js' and 'contentful-management.browser.js' bundles included all the project's dependencies in the bundle itself. The dependencies are not included in the new ESM or CJS bundles, but are still included in the browser bundle.

Thus, we have noticed that some project build systems might fail upon updating to v12 when contentful-management tries to import one of its dependencies and the project is not set up to transpile code in node_modules. A particular instance is when the main project is CommonJS and it tries to import 'contentful-sdk-core', which is an ESM-only library. Build systems might need to be updated to transpile 'contentful-sdk-core' into CommonJS so it can be included.

To mitigate this issue, we will look into shipping CommonJS (along with ESM) versions of 'contentful-sdk-core'.

#### Changes to browser bundle

Browser bundle methods must now be accessed from the `contentfulManagement` object which is added to `window` on load (e.g., `window.contentfulManagement.createClient()`). If you were using methods directly, update your code to destructure them from the `contentfulManagement` object (e.g., `const { createClient } = contentfulManagement`).

**JSDelivr usage:**

```html
<!-- Before -->
<script src="https://cdn.jsdelivr.net/npm/contentful-management@11/dist/contentful-management.browser.min.js"></script>

<!-- After -->
<script src="https://cdn.jsdelivr.net/npm/contentful-management@12"></script>
```

See the [Browser Bundle In Script Tag](README.md#browser-bundle-in-script-tag) section in the main README for more info.

#### Use of new `exports` field in package.json

The `exports` field in `package.json` now restricts access to internal module files. If you were previously using deep imports (e.g., `import { SomeValue } from 'contentful-management/dist/subfolder/SomeValue'`), they will no longer work. This likely means you were importing something not intended to be part of the public API. Try importing directly from `contentful-management` instead. If the export you need is still unavailable, please file an issue so we can evaluate whether it should be exposed publicly.

#### Importing Types from 'contentful-management/types'

All types are exported from both `contentful-management` and `contentful-management/types` for backwards compatibility. However, `contentful-management/types` now use the new `exports` field described above. Older module resolution strategies might not support importing types this way. You'll need to either update `moduleResolution` in your `tsconfig.json` to a modern value (e.g., `node16` or higher), or import types directly from `contentful-management` instead.

**Migration options:**

Option 1 - Update tsconfig.json:

```json
{
  "compilerOptions": {
    "moduleResolution": "node16" // or "bundler" or "nodenext"
  }
}
```

Option 2 - Import from main package:

```typescript
// Instead of
import type { Space } from 'contentful-management/types'

// Use
import type { Space } from 'contentful-management'
```

#### Version param is now required for entry patch method

The `version` parameter is now required when calling `client.entry.patch()`. Previously, the TypeScript types incorrectly marked `version` as optional, even though the method implementation always expected it to be provided.

**What changed:**

- The `version` parameter in `entry.patch()` is now required in the TypeScript types
- Previously, some users worked around the missing type by passing `version` via the `X-Contentful-Version` header, which will no longer be necessary

**Migration:**
If you were previously passing `version` in the headers or not passing it at all, you'll need to update your code to include `version` in the params object:

```typescript
// Before (if you were using headers workaround)
await client.entry.patch({ spaceId: 'xxx', environmentId: 'xxx', entryId: 'yyy' }, patches, {
  'X-Contentful-Version': '123',
})

// After
await client.entry.patch(
  { spaceId: 'xxx', environmentId: 'xxx', entryId: 'yyy', version: 123 },
  patches,
)
```

**Why this change:**
The `version` parameter was always expected by the implementation (it gets transformed into the `X-Contentful-Version` header internally), but the TypeScript types were incorrect. This fix aligns the types with the actual API behavior and ensures proper type safety.

#### Taxonomy entity update methods now use PUT

The `update` method for `concept` and `conceptScheme` now performs a PUT request instead of a PATCH request.

- If you were using `update()` with `OpPatch[]`, use `patch()` instead
- If you were using `updatePut()`, use `update()` instead. The new `update` is identical to the old `updatePut`.

#### Default client changed from nested to plain

The `createClient` function now defaults to the **plain client** instead of the nested (legacy) client.

**What changed:**

- Previously, calling `createClient({ accessToken: 'token' })` returned the nested client
- Now, the same call returns the plain client
- To continue using the legacy nested client, you must explicitly pass `{ type: 'legacy' }`

**Migration:**

If you need to continue using the legacy nested client, update your code to explicitly request it:

```typescript
// Before - implicitly used nested client
const client = createClient({ accessToken: 'token' })

// After - explicitly request legacy nested client
const client = createClient({ accessToken: 'token' }, { type: 'legacy' })
```

**Recommended:** We strongly recommend migrating to the plain client API, as the legacy nested client is deprecated and will be removed in the next major version. See the README for migration guidance.

#### DefaultParams renamed to PlainClientDefaultParams

The `DefaultParams` type has been renamed to `PlainClientDefaultParams` to avoid confusion with legacy client params.

**Migration:**

```typescript
// Before
import type { DefaultParams } from 'contentful-management'

// After
import type { PlainClientDefaultParams } from 'contentful-management'
```

#### ClientParams type removed

The `ClientParams` type has been removed as it was outdated and confusing. Use `ClientOptions` instead for typing client creation options.

**Migration:**

```typescript
// Before
import type { ClientParams } from 'contentful-management'

// After
import type { ClientOptions } from 'contentful-management'
```

#### API type naming standardized

API type names have been standardized to use uppercase `API` suffix instead of `Api` for consistency with existing conventions.

**Renamed types:**

- `ContentfulEntryApi` → `ContentfulEntryAPI`
- `ContentfulEnvironmentTemplateApi` → `ContentfulEnvironmentTemplateAPI`
- `ContentfulUIConfigApi` → `ContentfulUIConfigAPI`

Additionally, `create-user-ui-config-api.ts` previously exported `ContentfulUIConfigApi` (same name as `create-ui-config-api.ts`), which has been renamed to `ContentfulUserUIConfigAPI` to fix this duplicate name bug.

**Migration:**

```typescript
// Before
import type { ContentfulEntryApi } from 'contentful-management'

// After
import type { ContentfulEntryAPI } from 'contentful-management'
```

#### alphaFeatures option removed

The `alphaFeatures` option has been removed from `createClient` as it was deprecated, unsupported, and unused.

**Migration:**

If you were passing `alphaFeatures` to `createClient`, simply remove it:

```typescript
// Before
const client = createClient({
  accessToken: 'token',
  alphaFeatures: { includeContentSourceMaps: true },
})

// After
const client = createClient({
  accessToken: 'token',
})
```

### Troubleshooting

#### Error: "Cannot find module 'contentful-management/dist/...'"

**Cause:** Youre using deep imports to internal modules.

**Solution:** Import from the main `contentful-management` package instead. If you need access to a specific export that's not available, please [file an issue](https://github.com/contentful/contentful-management.js/issues).

#### Error: "Package subpath './types' is not defined by 'exports'"

**Cause:** Your TypeScript configuration uses an older module resolution strategy.

**Solution:** Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "node16"
  }
}
```

Or import types directly from `contentful-management` instead of `contentful-management/types`.

#### Error: "Unexpected token" or syntax errors in older browsers

**Cause:** Your environment doesn't support ES2021.

**Solution:**

- For Node.js: Upgrade to Node.js v20 or higher
- For browsers: Ensure you're targeting modern browsers that support ES2021 (Chrome 85+, Firefox 79+, Safari 14+, Edge 85+)
- Consider using a transpilation tool like Babel if you must support older environments

#### Types not resolving correctly

**Possible causes:**

- Outdated module resolution in `tsconfig.json`
- IDE needs to be restarted after upgrade
- Type cache needs to be cleared

**Solutions:**

1. Update `moduleResolution` to `node16` or higher
2. Restart your IDE/TypeScript server
3. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Need help?

- Review the [CHANGELOG](CHANGELOG.md) for all changes
- Check the [README](README.md) for updated usage examples
- [File an issue](https://github.com/contentful/contentful-management.js/issues) if you encounter problems
