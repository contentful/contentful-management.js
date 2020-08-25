const cloneDeep = require('lodash/cloneDeep')
const webpackConfig = cloneDeep(require('./webpack.config.js')[1])
delete webpackConfig.entry
delete webpackConfig.output
webpackConfig.devtool = 'inline-source-map'

//files: ['test/unit/**/*.test.js'],
const unitTestsPattern = ['test/unit/**/*-test.js']
const integrationTestsPattern = 'test/integration/tag-integration.js'

webpackConfig.node = {
  fs: 'empty',
}

webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
  if (rule.loader === 'babel-loader') {
    rule.options.envName = 'test'
    rule.options = {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true,
            },
          },
        ],
        '@babel/typescript',
      ],
    }
  }
  return rule
})

module.exports = {
  plugins: [require('karma-webpack'), require('karma-mocha'), require('karma-env-preprocessor')],
  basePath: '',
  frameworks: ['mocha'],
  files: [
    {
      pattern: unitTestsPattern,
      watched: false,
    },
    {
      pattern: integrationTestsPattern,
      watched: false,
    },
  ],
  envPreprocessor: [
    'API_INTEGRATION_TESTS',
    'CONTENTFUL_ACCESS_TOKEN',
    'CONTENTFUL_V2_ACCESS_TOKEN',
  ],
  preprocessors: {
    [unitTestsPattern]: ['webpack', 'env'],
    [integrationTestsPattern]: ['webpack', 'env'],
  },
  webpack: webpackConfig,
  browserDisconnectTolerance: 5,
  browserNoActivityTimeout: 4 * 60 * 1000,
  browserDisconnectTimeout: 10000,
  captureTimeout: 4 * 60 * 1000,
  reporters: ['dots'],
  port: 9876,
  colors: true,
  autoWatch: false,
  singleRun: true,
}
