#!/usr/bin/env node

import Logger from './helpers/logger';
import { resolve } from './helpers/module-resolver';
import config from './config/config';

const program = require('commander');
const pkg = require('../package.json')
const gonzales = require('gonzales-pe-sl');
const fs = require('fs');
const glob = require('glob');

const sassLint = require('sass-lint');
const sassLintConfig = require('sass-lint/lib/config');
const sassLintHelpers = require('sass-lint/lib/helpers');
const sassLintRules = require('sass-lint/lib/rules');

let _defaultOptions = {
  ...config
};

program
  .version(pkg.version)
  .option('-y, --yes', 'auto resolve any issues')
  .option('-c, --config', 'custom config path')
  .option('-v, --verbose', 'verbose logging')
  .parse(process.argv);

const logger = new Logger(program.verbose);

glob(_defaultOptions.files.include, {}, (_globError, files) => {
  if (_globError) {
    logger.verbose('error', _globError);
    return;
  }
  files.forEach(filename => {
    fs.readFile(filename, (_readError, file) => {
      if (_readError) {
        logger.verbose('error', _readError);
        return;
      }

      logger.verbose('process', filename)
      const ast = gonzales.parse(file.toString(), {
        syntax: 'scss'
      });

      const config = sassLintConfig({}, 'node_modules/sass-lint/config/')

      const rules = sassLintRules(config)

      rules
        .filter(rule => !!_defaultOptions.resolvers[rule.rule.name])
        .map(rule => resolve(`${rule.rule.name}`)
          .then(module => {
            const detects = rule.rule.detect(ast, rule);
            logger.verbose(`${filename} - detect`, module.name, '-', detects.length)

            if (detects.length > 0) {
              const resolver = new module(ast, rule);
              logger.verbose('--fix', `Running [${rule.rule.name}] on ${filename}`)

              const resolvedTree = resolver.fix();
              fs.writeFileSync(filename, resolvedTree.toString());
              logger.verbose('write', `Writing resolved tree to ${filename}`)
            }
          })
        )
    });
  });
})
