#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json')

program
  .version(pkg.version)
  .option('-y', '--yes', 'auto resolve any issues')
  .option('-c', '--config', 'custom configuration path')
  .option('-v', '--verbose')
  .parse(process.argv)
