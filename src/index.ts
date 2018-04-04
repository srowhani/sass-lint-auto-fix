#!/usr/bin/env node
import Logger from './helpers/logger';
import SlAutoFix from './sass-lint-fix';

const program = require('commander');
const process = require('process');

const pkg = require('../package.json');
const yaml = require('js-yaml');
const fs = require('fs');

(() => {
  program
    .version(pkg.version)
    .usage('"<pattern>" [options]')
    .option('-y, --yes', 'auto resolve any issues')
    .option('-c, --config', 'custom config path')
    .option('-v, --verbose', 'verbose logging')
    .parse(process.argv);

  const logger = new Logger(program.verbose);

  process.on('unhandledRejection', (error: Error) => logger.error(error));

  const config = yaml.safeLoad(fs.readFileSync('./src/config/default.yml'));

  let defaultOptions = { ...config };

  if (program.config) {
    // TOOD: Handle different configuration types
    const customConfiguration = JSON.parse(fs.readFileSync(program.config));
    defaultOptions = { ...defaultOptions, customConfiguration };
  }

  defaultOptions.verbose = program.verbose || defaultOptions.verbose;

  const pattern = program.args[0];

  defaultOptions.files.include = pattern || defaultOptions.files.include;

  const sassLintAutoFix = new SlAutoFix(defaultOptions);

  sassLintAutoFix.run({
    onResolve({ filename, resolvedTree }) {
      fs.writeFileSync(filename, resolvedTree.toString());
      logger.verbose('write', `Writing resolved tree to ${filename}`);
    },
  });
})();
