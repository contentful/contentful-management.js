const cloneDeep = require('lodash/cloneDeep')
const webpackConfig = cloneDeep(require('./webpack.config.js')[1])
delete webpackConfig.entry
delete webpackConfig.output
webpackConfig.devtool = 'inline-source-map'

webpackConfig.node = {
  fs: 'empty',
}

webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
  if (rule.loader === 'babel-loader') {
    rule.options.envName = 'test'
  }
  return rule
})

//console.log('Karma webpack config:')
//console.log(JSON.stringify(webpackConfig, null, 2))

module.exports = {
  plugins: [require('karma-webpack'), require('karma-mocha')],

  basePath: '',
  frameworks: ['mocha'],
  //files: ['test/unit/**/*.js'],
  files: ['test/unit/create-cma-http-client-test.js'],

  preprocessors: {
    //'test/unit/**/*.js': ['webpack'],
    'test/unit/create-cma-http-client-test.js': ['webpack'],
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
