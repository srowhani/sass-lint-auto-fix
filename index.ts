#!/usr/bin/env node
import SlAutoFix from './src/sass-lint-fix';
import Logger from './src/helpers/logger';

const config = require('./src/config');

(() => {
  const program = require('commander');

  const pkg = require('../package.json')
  const fs = require('fs');

  const defaultOptions = {...config};

  program
    .version(pkg.version)
    .usage('<pattern> [options]')
    .option('-y, --yes', 'auto resolve any issues')
    .option('-c, --config', 'custom config path')
    .option('-v, --verbose', 'verbose logging')
    .parse(process.argv);

  defaultOptions.verbose = program.verbose;

  const pattern = program.args[0];

  defaultOptions.files.include = pattern || defaultOptions.files.include;

  const sassLintAutoFix = new SlAutoFix(defaultOptions)

  sassLintAutoFix.run({
    onResolve (filename, rule, ast) {
      fs.writeFileSync(filename, ast.toString());
      this.logger.verbose('write', `Writing resolved tree to ${filename}`)
    }
  });
})();
