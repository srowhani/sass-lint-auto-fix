#!/usr/bin/env node
import {
  CONFIG_TYPE,
  createLogger,
  getConfig,
  loadDefaults,
  mergeConfig,
} from './helpers';

import program from 'commander';
import { autoFixSassFactory } from './sass-lint-auto-fix';
import { SentryService } from './services';

import fs from 'fs';
import process from 'process';

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
      '--config-sass-lint <path>',
      'custom sass lint config path (e.g /path/to/.sass-lint.yml',
    )
    .option('-s, --silent', 'runs in silent mode')
    .option('-d, --debug', 'runs in debug mode')
    .parse(process.argv);

  const logger = createLogger({
    silentEnabled: program.silent,
    debugEnabled: program.debug,
  });

  let baseOptions = loadDefaults();
  if (program.config) {
    // TOOD: Handle different configuration types
    const customConfiguration = getConfig(
      CONFIG_TYPE.SASS_LINT_AUTO_FIX,
      program.config,
    );
    baseOptions = mergeConfig(baseOptions, customConfiguration);
  }

  const sassLintConfig = getConfig(
    CONFIG_TYPE.SASS_LINT,
    program.configSassLint,
  );

  process.on('unhandledRejection', (error: Error) => {
    if (!baseOptions.options.optOut) {
      SentryService.reportIncident(error);
    }
    logger.error(error);
    process.exitCode = 1;
  });

  process.on('uncaughtException', (error: Error) => {
    if (!baseOptions.options.optOut) {
      SentryService.reportIncident(error);
    }
    logger.error(error);
    process.exitCode = 1;
  });

  const pattern = program.args[0];

  baseOptions.files.include = pattern || baseOptions.files.include;

  const sassLintAutoFix = autoFixSassFactory({
    ...baseOptions,
    logger,
  });

  // TODO: Add sass-lint config, right now will merge with default rule set
  for (const { filename, ast } of sassLintAutoFix(sassLintConfig)) {
    fs.writeFileSync(filename, ast.toString());
    logger.verbose('write', `Writing resolved tree to ${filename}`);
  }
})();
