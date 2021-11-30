import { SentryService } from './services';

import {
  ConfigOpts,
  CreateModuleConfig,
  Resolution,
  Resolver,
  ResolverConstructable,
  ValidFileType,
} from './types';

import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

import { parse } from 'gonzales-pe-sl';
import { LintOpts, SlRule } from 'sass-lint';
import getConfig from 'sass-lint/lib/config';
import getRules from 'sass-lint/lib/rules';

export function autoFixSassFactory(config: ConfigOpts) {
  const { logger } = config;

  const _getRules = config.slRules || getRules;
  const _getConfig = config.slConfig || getConfig;

  const patternsToInclude =
    typeof config.files.include === 'string'
      ? [config.files.include]
      : config.files.include;

  return function* autoFixSass(
    options: LintOpts,
  ): IterableIterator<Resolution> {
    for (const pattern of patternsToInclude) {
      const files = glob.sync(pattern, {
        ignore: config.files.ignore,
      });

      for (const filename of files) {
        const content = fs.readFileSync(filename).toString();
        if (content !== null && content !== undefined && content.length > 0) {
          const fileExtension = path.extname(filename).substr(1).toLowerCase();

          if (isValidExtension(fileExtension)) {
            let ast;

            try {
              ast = parse(content, {
                syntax: fileExtension,
              });
            } catch (e) {
              logger.warn('parse', filename, e);
              return;
            }

            const rules = _getRules(_getConfig(options));

            const filteredRules: SlRule[] = rules.filter(
              (rule: SlRule) => config.resolvers[rule.rule.name],
            );

            for (const rule of filteredRules) {
              const { name } = rule.rule;
              let resolver: Resolver;

              try {
                resolver = createModule({
                  name,
                  ast,
                  rule,
                });
              } catch (e) {
                SentryService.reportIncident(e);
                logger.warn('resolver', `Module '${name}' doesn't exist.`);
                return;
              }

              try {
                const detects = rule.rule.detect(ast, rule);

                if (detects.length > 0) {
                  logger.verbose(
                    'fix',
                    `Running resolver "${name}" on "${filename}"`,
                  );

                  ast = resolver.fix(detects);
                  yield {
                    ast,
                    filename,
                    rule,
                  };
                }
              } catch (e) {
                if (!config.options.optOut) {
                  SentryService.reportIncident(e);
                }
                // TODO: Friendly way to inform user that an unexpected error occured
                logger.warn('error', e);
              }
            }
          }
        }
      }
    }
  };
}

export function createModule({
  ast,
  name,
  rule,
}: CreateModuleConfig): Resolver {
  const _module: ResolverConstructable = require(`./resolvers/${name}`).default;

  return new _module(ast, rule);
}

export function isValidExtension(fileExtension: string): boolean {
  return fileExtension in ValidFileType;
}
