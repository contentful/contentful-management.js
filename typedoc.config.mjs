// In versioned deployments, docs live at <root>/contentful-management/<version>/
// CI sets DOCS_BASE_URL at build time; locally it falls back to the repo root.
const hostedBaseUrl =
  process.env.DOCS_BASE_URL || 'https://contentful.github.io/contentful-management.js/'

/** @type {Partial<import('typedoc').TypeDocOptions>} */
export default {
  name: 'contentful-management.js',

  // ---------------------------------------------------------------------------
  // Entry points — grouped by category so TypeDoc can build the nav hierarchy.
  // All legacy create-*-api files are listed explicitly (not via glob) so we
  // control exactly which chainable-client modules appear in the sidebar.
  // ---------------------------------------------------------------------------
  entryPoints: [
    // Core
    'lib/index.ts',

    // Plain Client (recommended)
    'lib/plain/plain-client.ts',
    'lib/plain/plain-client-types.ts',
    'lib/plain/checks.ts',

    // Legacy Client (chainable, deprecated)
    'lib/create-contentful-api.ts',
    'lib/create-space-api.ts',
    'lib/create-environment-api.ts',
    'lib/create-entry-api.ts',
    'lib/create-organization-api.ts',
    'lib/create-app-definition-api.ts',
    'lib/create-environment-template-api.ts',

    // Plain entity API types (one module page per resource)
    'lib/plain/entities/*.ts',

    // Chainable entity types (both plain and chainable share these)
    'lib/entities/*.ts',
  ],

  out: 'out',
  tsconfig: 'tsconfig.json',
  includeVersion: true,

  // ---------------------------------------------------------------------------
  // Category / group configuration
  // categorizeByGroup: false lets @category tags on modules drive the sidebar
  // rather than TypeDoc's auto-grouping by kind (Interface, Function, etc.).
  // ---------------------------------------------------------------------------
  categorizeByGroup: false,
  categoryOrder: ['Getting Started', 'Core', 'Plain Client', 'Legacy Client', 'Shared Types', '*'],
  defaultCategory: 'Other',

  kindSortOrder: [
    'Project',
    'Module',
    'Namespace',
    'Constructor',
    'Property',
    'Function',
    'Enum',
    'EnumMember',
    'Class',
    'Interface',
    'TypeAlias',
    'Variable',
    'Reference',
    'Accessor',
    'Method',
    'Parameter',
    'TypeParameter',
    'TypeLiteral',
    'CallSignature',
    'ConstructorSignature',
    'IndexSignature',
    'GetSignature',
    'SetSignature',
  ],

  groupOrder: ['Functions', 'Interfaces', 'Modules', '*'],

  // ---------------------------------------------------------------------------
  // Sorting & visibility
  // ---------------------------------------------------------------------------
  sortEntryPoints: false,
  sort: ['source-order'],
  readme: 'README.md',
  excludePrivate: true,
  excludeInternal: true,
  excludeProtected: false,
  excludePrivateClassFields: true,
  excludeExternals: true,
  useFirstParagraphOfCommentAsSummary: true,
  treatWarningsAsErrors: false,

  // ---------------------------------------------------------------------------
  // Project documents — rendered as top-level pages in the sidebar.
  // The Getting Started guide is listed first so it appears above the API ref.
  // ---------------------------------------------------------------------------
  projectDocuments: ['docs/Getting Started/', 'docs/shared-types.md'],

  // ---------------------------------------------------------------------------
  // Plugins
  //   typedoc-plugin-missing-exports — surfaces types that are used in the
  //     public API but not explicitly exported (e.g. PlainClientAPI sub-types)
  //   typedoc-github-theme — GitHub-styled output
  //   version-selector — injects a version dropdown into every page
  // ---------------------------------------------------------------------------
  plugin: [
    'typedoc-plugin-missing-exports',
    'typedoc-github-theme',
    './docs/plugins/version-selector/typedoc-version-selector.mjs',
  ],

  // Places internal types next to the module that owns them rather than
  // collecting them in a separate "internals" section.
  placeInternalsInOwningModule: true,

  validation: {
    // @deprecated tags on legacy methods link to *PlainClientAPI types that are
    // only surfaced via placeInternalsInOwningModule, not exported TypeScript
    // entry points. Suppress the resulting false-positive link warnings.
    invalidLink: false,
  },

  // ---------------------------------------------------------------------------
  // URL / hosting
  // ---------------------------------------------------------------------------
  hostedBaseUrl,
  useHostedBaseUrlForAbsoluteLinks: true,
  router: 'structure',
  cacheBust: true,

  // ---------------------------------------------------------------------------
  // Theme & display
  // ---------------------------------------------------------------------------
  hideGenerator: true,
  searchInComments: true,
  searchInDocuments: true,

  // Promote plain-client results; demote legacy so new users land on the right API
  searchCategoryBoosts: {
    'Plain Client': 2,
    'Shared Types': 1.5,
    'Legacy Client': 0.5,
  },
  searchGroupBoosts: {
    Functions: 1.5,
    Interfaces: 1.2,
  },

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  navigationLinks: {
    GitHub: 'https://github.com/contentful/contentful-management.js',
    npm: 'https://www.npmjs.com/package/contentful-management',
    'CMA Reference':
      'https://www.contentful.com/developers/docs/references/content-management-api/',
  },

  navigationLeaves: ['DefaultElements', 'OptionalDefaults'],

  externalSymbolLinkMappings: {
    typescript: {
      Iterator:
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator',
    },
  },

  navigation: {
    includeGroups: false,
    includeCategories: true,
    includeFolders: false,
    excludeReferences: true,
  },
}
