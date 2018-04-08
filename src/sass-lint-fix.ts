import AbstractSyntaxTree from './resolvers/typings/abstract-syntax-tree';
import SlRule from './resolvers/typings/sass-lint-rule';

import Logger from './helpers/logger';
import resolve from './helpers/module-resolver';

const gonzales = require('gonzales-pe-sl');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const slConfig = require('sass-lint/lib/config');
const slRules = require('sass-lint/lib/rules');

export default class SlAutoFix {
  public _logger: Logger;
  public _defaultOptions: any;

  constructor(defaultOptions: any) {
    this._logger = new Logger(defaultOptions.verbose);

    this._defaultOptions = {
      ...defaultOptions,
    };
  }

  public run(
    lintOptions: any,
    onResolve: (
      filename: string,
      rule: SlRule,
      ast: AbstractSyntaxTree,
    ) => void,
  ) {
    glob(
      this._defaultOptions.files.include,
      {},
      (_globError: string, files: string[]) => {
        if (_globError !== null) {
          this.logger.verbose('error', _globError);
          return;
        }

        files.forEach((filename: string) => {
          fs.readFile(filename, (_readError: string, file: any) => {
            if (_readError) {
              this.logger.verbose('error', _readError);
              return;
            }

            this.logger.verbose('process', filename);
            const fileExtension = path.extname(filename).substr(1);

            if (!this.isValidExtension(fileExtension)) {
              return;
            }

            let ast: any;

            try {
              ast = gonzales.parse(file.toString(), {
                syntax: fileExtension,
              });
            } catch (e) {
              this.logger.error(Error(`Unable to parse ${filename}`));
              return;
            }

            const rules = slRules(slConfig(lintOptions));

            return rules
              .filter(
                (rule: SlRule) =>
                  !!this._defaultOptions.resolvers[rule.rule.name],
              )
              .map((rule: SlRule) =>
                resolve(`${rule.rule.name}`).then(Module => {
                  const detects = rule.rule.detect(ast, rule);
                  this.logger.verbose(
                    `${filename} - detect`,
                    rule.rule.name,
                    '-',
                    detects.length,
                  );

                  if (detects.length > 0) {
                    const resolver = new Module(ast, rule);
                    this.logger.verbose(
                      '--fix',
                      `Running [${rule.rule.name}] on ${filename}`,
                    );

                    const resolvedTree = resolver.fix();
                    return onResolve(filename, rule, resolvedTree);
                  }
                }),
              );
          });
        });
      },
    );
  }

  public isValidExtension(fileExtension: string): boolean {
    return this._defaultOptions.syntax.include.includes(fileExtension);
  }

  get logger() {
    return this._logger;
  }

  set logger(logger) {
    this._logger = logger;
  }
}
