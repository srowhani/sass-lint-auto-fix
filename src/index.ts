#!/usr/bin/env node
import { getConfig, Logger, mergeConfig, reportIncident } from './helpers';
import SlAutoFix, { autoFixSassFactory } from './sass-lint-auto-fix';

const program = require('commander');
const process = require('process');
const fs = require('fs');

const pkg = require('../package.json');

(() => {
  program
    .version(pkg.version)
    .usage('"<pattern>" [options]')
    .option(
      '-c, --config <path>',
      'custom config path (e.g /path/to/sass-lint-auto-fix.yml)',
    )
    .option('-s, --silent', 'runs in silent mode')
    .option('-d, --debug', 'runs in debug mode')
    .parse(process.argv);

  const logger = new Logger({
    silentEnabled: program.silent,
    debugEnabled: program.debug,
  });

  const config = getConfig(require.resolve('./config/default.yml'));
  let defaultOptions = { ...config };
  if (program.config) {
    // TOOD: Handle different configuration types
    const customConfiguration = getConfig(program.config);
    defaultOptions = mergeConfig(defaultOptions, customConfiguration);
  }

  defaultOptions.silent = program.silent || defaultOptions.silent;

  if (!defaultOptions.optOut) {
    logger.debug('Installing sentry');
  }

  process.on('unhandledRejection', (error: Error) => {
    if (!defaultOptions.optOut) {
      reportIncident(error);
    }
    logger.error(error);
  });

  process.on('uncaughtException', (error: Error) => {
    if (!defaultOptions.optOut) {
      reportIncident(error);
    }
    logger.error(error);
    process.exit(1);
  });

  const pattern = program.args[0];

  defaultOptions.files.include = pattern || defaultOptions.files.include;

  const sassLintAutoFix = autoFixSassFactory(defaultOptions);

  for (const { filename, ast } of sassLintAutoFix({} as any)) {
    fs.writeFileSync(filename, ast.toString());
    logger.verbose('write', `Writing resolved tree to ${filename}`);
  }
})();
