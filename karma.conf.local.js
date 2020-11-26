const karmaBaseConf = require('./karma.base.conf')
module.exports = function (config) {
  karmaBaseConf.concurrency = 1
  karmaBaseConf.logLevel = config.LOG_DEBUG
  karmaBaseConf.plugins.push(require('karma-chrome-launcher'))
  karmaBaseConf.plugins.push(require('karma-firefox-launcher'))
  karmaBaseConf.browsers = ['Firefox', 'Chrome']
  config.set(karmaBaseConf)
}
