'use strict'

module.exports = {
  require: ['@babel/register'],
  file: ['./test/mocha-global.js', './test/chai-global.js'],
  diff: true,
  recursive: true,
  extension: ['js', 'ts'],
  timeout: 60 * 1000,
  slow: 10 * 1000,
  ui: 'bdd',
}
