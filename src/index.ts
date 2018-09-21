#!/usr/bin/env node
import {
  createLogger,
  getConfig,
  mergeConfig,
  reportIncident,
} from './helpers';

import { autoFixSassFactory } from './sass-lint-auto-fix';
import { ConfigOpts, LintOpts } from './typings';

const process = require('process');
const program = require('commander');
const fs = require('fs');

const { version } = require('../package.json');

(() => {
  program
    .version(version)
    .usage('"<pattern>" [options]')
    .option(
      '-c, --config <path>',
      'custom config path (e.g /path/to/.sass-lint-auto-fix.yml)',
    )
    .option(
      '-csl, --config-sass-lint <path>',
      'custom sass lint config path (e.g /path/to/.sass-lint.yml',
    )
    .option('-s, --silent', 'runs in silent mode')
    .option('-d, --debug', 'runs in debug mode')
    .parse(process.argv);

  const logger = createLogger({
    silentEnabled: program.silent,
    debugEnabled: program.debug,
  });

  const config = getConfig(require.resolve('./config/default.yml'));
  let slConfig: Partial<LintOpts> = {};

  let defaultOptions = { ...config } as ConfigOpts;
  if (program.config) {
    // TOOD: Handle different configuration types
    const customConfiguration = getConfig(program.config);
    defaultOptions = mergeConfig(defaultOptions, customConfiguration);
  }

  // Pass in custom sass-lint configuration
  if (program.configSassLint) {
    slConfig = getConfig(program.configSassLint);
  }

  if (!defaultOptions.options.optOut) {
    logger.debug('Installing sentry');
  }

  process.on('unhandledRejection', (error: Error) => {
    if (!defaultOptions.options.optOut) {
      reportIncident(error);
    }
    logger.error(error);
  });

  process.on('uncaughtException', (error: Error) => {
    if (!defaultOptions.options.optOut) {
      reportIncident(error);
    }
    logger.error(error);
    process.exit(1);
  });

  const pattern = program.args[0];

  defaultOptions.files.include = pattern || defaultOptions.files.include;

  const sassLintAutoFix = autoFixSassFactory({
    logger,
    ...defaultOptions,
  });

  // TODO: Add sass-lint config, right now will merge with default rule set
  for (const { filename, ast } of sassLintAutoFix(slConfig as LintOpts)) {
    fs.writeFileSync(filename, ast.toString());
    logger.verbose('write', `Writing resolved tree to ${filename}`);
  }
})();
