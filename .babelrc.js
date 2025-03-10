// About this file:
// Babel 7 introduces .babelrc.js files. The .babelrc file can be removed when Babel 7 is released. (https://github.com/babel/babel/pull/4892)

// Babel 7 will also remove the 'env' option --> https://github.com/babel/babel/issues/4539#issuecomment-284870486
const env = process.env.BABEL_ENV || process.env.NODE_ENV

const defaultBabelPresetEnvConfig = {
  // No module transformation, webpack will take care of this if necessary.
  modules: false,
}

// Latest browsers (via package.json browserslists)
const browserBabelPresetEnvConfig = Object.assign({}, defaultBabelPresetEnvConfig)

// Node
const nodeBabelPresetEnvConfig = Object.assign({}, defaultBabelPresetEnvConfig, {
  targets: {
    node: '18',
  },
})

// Combined node and browser environment for es6 modules version and tests
const modulesBabelPresetEnvConfig = Object.assign({}, defaultBabelPresetEnvConfig, {
  targets: Object.assign(nodeBabelPresetEnvConfig.targets),
})

const testBabelPresetEnvConfig = Object.assign({}, modulesBabelPresetEnvConfig, {
  // Tests need to transform modules
  modules: 'commonjs',
})

const plugins = [
  '@babel/proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-export-namespace-from',
  'lodash',
  [
    'inline-replace-variables',
    {
      // Inject version number into code
      __VERSION__: require('./package.json').version,
    },
  ],
]

let babelConfig = {
  plugins,
}

if (env === 'browser') {
  babelConfig = Object.assign(babelConfig, {
    presets: [['@babel/preset-env', browserBabelPresetEnvConfig], '@babel/typescript'],
  })
}

if (env === 'modules') {
  babelConfig = Object.assign(babelConfig, {
    presets: [['@babel/preset-env', modulesBabelPresetEnvConfig], '@babel/typescript'],
  })
}

if (env === 'node') {
  babelConfig = Object.assign(babelConfig, {
    presets: [['@babel/preset-env', nodeBabelPresetEnvConfig], '@babel/typescript'],
  })
}

module.exports = babelConfig
