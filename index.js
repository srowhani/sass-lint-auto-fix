#!/usr/bin/env node
import SlAutoFix from './src/sass-lint-fix';

const program = require('commander');

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

  const config = yaml.safeLoad(fs.readFileSync('./src/config/default.yml'))

  let defaultOptions = { ...config };

  if (program.config) {
    // TOOD: Handle different configuration types
    const customConfiguration = JSON.parse(fs.readFileSync(program.config));
    defaultOptions = { ...defaultOptions,  customConfiguration };
  }

  defaultOptions.verbose = program.verbose || defaultOptions.verbose;

  const pattern = program.args[0];

  defaultOptions.files.include = pattern || defaultOptions.files.include;

  const sassLintAutoFix = new SlAutoFix(defaultOptions);

  sassLintAutoFix.run({
    onResolve(filename, rule, ast) {
      fs.writeFileSync(filename, ast.toString());
      this.logger.verbose('write', `Writing resolved tree to ${filename}`);
    },
  });
})();
