---
category: Shared Types
---

# Shared Types

This section contains the TypeScript data shapes for all Contentful resources — entries, assets, content types, spaces, and so on.

## What's in here

Each module in this section typically contains two kinds of exports:

**Data shape types** (used by both clients)
- `EntryProps`, `AssetProps`, `ContentTypeProps`, etc. — the raw JSON shape of a resource as returned by the API
- `CreateEntryProps`, `CreateAssetProps`, etc. — the payload shape for create operations
- Supporting types like `EntryReferenceProps`, `AssetFileProp`, etc.

**Legacy wrapper classes** (legacy client only)
- `Entry`, `Asset`, `ContentType`, `Environment`, `Space`, etc. — these extend the props types with chainable instance methods like `.publish()`, `.archive()`, `.update()`
- `wrapEntry`, `wrapAsset`, etc. — internal factory functions that attach those methods; not part of the public API

## Which client uses what

| Symbol | Plain client | Legacy client |
|---|---|---|
| `EntryProps` | ✅ returned by `client.entry.get()` | ✅ base of the `Entry` wrapper |
| `CreateEntryProps` | ✅ passed to `client.entry.create()` | ✅ passed to `environment.createEntry()` |
| `Entry` | ❌ not used | ✅ returned by `environment.getEntry()` |
| `AssetProps` | ✅ returned by `client.asset.get()` | ✅ base of the `Asset` wrapper |
| `Asset` | ❌ not used | ✅ returned by `environment.getAsset()` |
| `Environment` | ❌ not used | ✅ returned by `space.getEnvironment()` |
| `Space` | ❌ not used | ✅ returned by `client.getSpace()` |

If you are using the **plain client** (recommended), you only need the `*Props` and `Create*Props` types from this section. The wrapper classes (`Entry`, `Asset`, etc.) are part of the legacy client and documented there too.

If you are using the **legacy client**, the wrapper classes are what you interact with directly. Their instance methods (`.publish()`, `.archive()`, etc.) are documented on each class page.

## Where to find the methods

- **Plain client methods** (`client.entry.get()`, `client.asset.create()`, etc.) — see the **Plain Client** section in the sidebar
- **Legacy client instance methods** (`entry.publish()`, `asset.archive()`, etc.) — these are documented here in **Shared Types**, on the `Entry`, `Asset`, `ContentType`, etc. pages, since the wrapper classes live alongside their props types in the same modules
- **Legacy client factory methods** (`space.getEnvironment()`, `environment.getEntry()`, etc.) — see the **Legacy Client** section in the sidebar (`create-space-api`, `create-environment-api`, etc.)
