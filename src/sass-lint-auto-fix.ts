import { AbstractSyntaxTree, SlRule, Resolver } from './resolvers/typings';

import { Logger, reportIncident } from './helpers';
import { ConfigOpts, LintOpts, Resolution, ValidFileType } from '@src/typings';

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import BaseResolver from '@srcresolvers/base-resolver';

const slConfig = require('sass-lint/lib/config');
const slRules = require('sass-lint/lib/rules');

const gonzales = require('gonzales-pe-sl');


export function autoFixSassFactory (config: ConfigOpts) {
  const logger = config.logger || new Logger();

  const _slRules = config.slRules || slRules;
  const _slConfig = config.slConfig || slConfig;

  const files = glob.sync(config.files.include, {
    ignore: config.files.ignore,
  });

  return function* autoFixSass (options: LintOpts): Iterable<Resolution> {
    for (const filename of files) {
      const content = fs.readFileSync(filename).toString();
      if (content !== null && content !== undefined && content.length > 0) {
        const fileExtension = path.extname(filename).substr(1).toLowerCase();
    
        if (isValidExtension(fileExtension)) {
          let ast: any;
    
          try {
            ast = gonzales.parse(content, {
              syntax: fileExtension,
            });
          } catch (e) {
            logger.warn('parse', { ...e, filename });
            return;
          }
    
          const rules = _slRules(_slConfig(options));
    
          const filteredRules: SlRule[] = rules.filter(
            (rule: SlRule) => config.resolvers[rule.rule.name]
          );

          for (const rule of filteredRules) {
            const { name } = rule.rule;
            let Module;
  
            try {
              Module = getModule(name);
            } catch (e) {
              logger.warn('resolver', `Module '${name}' doesn't exist.`);
              return;
            }
            try {
              const detects = rule.rule.detect(ast, rule);
  
              if (detects.length > 0) {
                const resolver = new Module(ast, rule);
                logger.verbose(
                  'fix',
                  `Running resolver "${name}" on "${filename}"`,
                );
  
                const resolvedTree = resolver.fix();
                yield {
                  ast: resolvedTree,
                  filename,
                  rule,
                }
              }
            } catch (e) {
              if (!config.optOut) {
                reportIncident(e);
              }
              // TODO: Friendly way to inform user that an unexpected error occured
              logger.warn(e);
            }
          }
        }
      }
    }
  }
}

export function getModule(name: string): Resolver {
  return require(`./resolvers/${name}`).default;
}

export function isValidExtension(fileExtension: string): boolean {
  return fileExtension in ValidFileType;
}