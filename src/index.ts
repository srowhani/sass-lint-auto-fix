#!/usr/bin/env node
import getConfig from './helpers/get-config';
import Logger from './helpers/logger';
import SlAutoFix from './sass-lint-auto-fix';

const Raven = require('raven');

const program = require('commander');
const process = require('process');

const pkg = require('../package.json');
const fs = require('fs');

(() => {
  program
    .version(pkg.version)
    .usage('"<pattern>" [options]')
    .option(
      '-c, --config <path>',
      'custom config path (e.g /path/to/sass-lint-auto-fix.yml)',
    )
    .option('-s, --silent', 'runs in silent mode')
    .parse(process.argv);

  const logger = new Logger(program.silent);

  const config = getConfig(require.resolve('./config/default.yml'));

  let defaultOptions = { ...config };
  if (program.config) {
    // TOOD: Handle different configuration types
    const customConfiguration = getConfig(program.config);
    defaultOptions = { ...defaultOptions, ...customConfiguration };
  }

  defaultOptions.silent = program.silent || defaultOptions.silent;

  process.on('unhandledRejection', (error: Error) => logger.error(error));
  if (defaultOptions.optOut !== true) {
    Raven.config(
      'https://01713b27b2bf4584a636aa5f2bb68ae7@sentry.io/1213043',
    ).install();

    process.on('uncaughtException', (error: Error) => {
      Raven.captureException(error);
      throw error;
    });
  }

  const pattern = program.args[0];

  defaultOptions.files.include = pattern || defaultOptions.files.include;

  const sassLintAutoFix = new SlAutoFix(defaultOptions);

  sassLintAutoFix.run({}, (filename, _, resolvedTree) => {
    fs.writeFileSync(filename, resolvedTree.toString());
    logger.verbose('write', `Writing resolved tree to ${filename}`);
  });
})();
