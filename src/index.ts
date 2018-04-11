#!/usr/bin/env node
import getConfig from './helpers/get-config';
import Logger from './helpers/logger';
import SlAutoFix from './sass-lint-fix';

const program = require('commander');
const process = require('process');

const pkg = require('../package.json');
const fs = require('fs');

(() => {
  program
    .version(pkg.version)
    .usage('"<pattern>" [options]')
    .option('-c, --config <path>', 'custom config path')
    .option('-v, --verbose', 'verbose logging')
    .parse(process.argv);

  const logger = new Logger(program.verbose);

  process.on('unhandledRejection', (error: Error) => logger.error(error));

  const config = getConfig(require.resolve('./config/default.yml'));

  let defaultOptions = { ...config };
  if (program.config) {
    // TOOD: Handle different configuration types
    const customConfiguration = getConfig(program.config);
    defaultOptions = { ...defaultOptions, ...customConfiguration };
  }

  defaultOptions.verbose = program.verbose || defaultOptions.verbose;

  const pattern = program.args[0];

  defaultOptions.files.include = pattern || defaultOptions.files.include;

  const sassLintAutoFix = new SlAutoFix(defaultOptions);

  sassLintAutoFix.run({}, (filename, _, resolvedTree) => {
    fs.writeFileSync(filename, resolvedTree.toString());
    logger.verbose('write', `Writing resolved tree to ${filename}`);
  });
})();
