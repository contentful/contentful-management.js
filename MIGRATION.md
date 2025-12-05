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

- Projects using Node.js versions older than v20
- Projects targeting browsers that do not support ES2021
- Code directly importing old bundle paths (`./dist/contentful-management.node.js`, etc.)
- Code using the browser bundle with direct method access (not via `contentfulManagement` object)
- Code using deep imports from internal modules
- TypeScript projects importing from `contentful-management/types` with older module resolution
- Code using the `Stream` type
- Code using the `entry.patch` method

### Breaking Changes

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

#### Node.js v20+ support

We dropped support for versions of Node that were no longer LTS and now support Node v20+.

**Compatibility:**

- ✅ Node.js v20+
- ❌ Node.js v18 and below

You will need to update the version of Node in your projects if it is less than v20.

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

When making requests to the `entry.patch` method, the `version` param was previously optional, but required in practice. We fixed the confusion by making the type for version required.

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
