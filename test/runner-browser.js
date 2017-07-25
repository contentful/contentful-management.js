require('core-js/fn/promise') // Readd promise polyfill for legacy browsers since karma-webpack removes it
// This file is required due to an issue with karma-tap
// https://github.com/tmcw-up-for-adoption/karma-tap/issues/10
require('./unit/contentful-management-test.js')
require('./unit/create-contentful-api-test.js')
require('./unit/create-space-api-test.js')
require('./unit/error-handler-test.js')
require('./unit/entities/asset-test.js')
require('./unit/entities/content-type-test.js')
require('./unit/entities/entry-test.js')
require('./unit/entities/api-key-test.js')
require('./unit/entities/locale-test.js')
require('./unit/entities/role-test.js')
require('./unit/entities/space-membership-test.js')
require('./unit/entities/space-test.js')
require('./unit/entities/webhook-test.js')
/**
 * Temporarily disabled integration tests
 * (check TP ticket #10533 and #10534)
 * Even if issue #10534 is fixed and the space per hour rate limit is increased
 * running many integration tests very quickly can still be an issue due to
 * #10533, so be careful if/when reenabling this
 */
// require('./integration/integration-tests.js')
