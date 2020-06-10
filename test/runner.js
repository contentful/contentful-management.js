#!/usr/bin/env node
/* eslint-disable no-useless-escape */
require('require-all')({
  dirname: process.cwd() + '/test/unit',
  filter: process.argv[2] || /\-test\.js$/,
  recursive: true,
})
