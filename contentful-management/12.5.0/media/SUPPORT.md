# Support and Maintenance Policy

## Active Support

The latest major version of `contentful-management` receives **active support**, which includes:

- New features and enhancements
- Bug fixes
- Security patches
- Performance improvements

We recommend always using the latest major version in production.

## Previous Version Support

When a new major version is released, the previous major version enters a **maintenance period of 6 months**. During this period, the previous version will only receive:

- **Critical bug fixes** — issues that prevent core functionality from working as expected
- **Security vulnerability patches** — fixes for known security issues

No new features, minor bug fixes, or performance improvements will be backported to previous versions during the maintenance period.

## End of Support

After the 6-month maintenance period, previous major versions are considered **end-of-life** and will no longer receive any updates, including security patches. We strongly encourage upgrading to the latest major version before the maintenance period ends.

Contentful will not deactivate any published packages, so existing installations will continue to function. However, unresolved issues will require upgrading to a supported version.

## Version Support Schedule

| Version | Status | Maintenance End |
| ------- | ------ | --------------- |
| v12.x | Active | — |
| v11.x | Maintenance | 6 months after v12 release |
| v10.x and earlier | End of Life | — |

## Reporting Issues

- **Supported versions**: File an issue on [GitHub](https://github.com/contentful/contentful-management.js/issues/new)
- **Security vulnerabilities**: Please report security issues responsibly via [Contentful's security page](https://www.contentful.com/security/)
