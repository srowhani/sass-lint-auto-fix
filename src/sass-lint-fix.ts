import AbstractSyntaxTree from './resolvers/typings/abstract-syntax-tree';
import SlRule from './resolvers/typings/sass-lint-rule';

import Logger from './helpers/logger';

const gonzales = require('gonzales-pe-sl');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const slConfig = require('sass-lint/lib/config');
const slRules = require('sass-lint/lib/rules');

export default class SlAutoFix {
  public _logger: Logger;
  public _defaultOptions: any;

  constructor(defaultOptions: any = {}) {
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
    const files = glob.sync(this._defaultOptions.files.include, {
      ignore: this._defaultOptions.files.ignore,
    });
    files.forEach((filename: string) => {
      const content = fs.readFileSync(filename).toString();
      this.processFile(
        {
          filename,
          content,
          options: lintOptions,
        },
        onResolve,
      );
    });
  }

  public processFile(
    file: any,
    onResolve: (
      filename: string,
      rule: SlRule,
      resolvedTree: AbstractSyntaxTree,
    ) => void,
  ) {
    const { filename, content, options } = file;

    if (content !== null) {
      const fileExtension = path.extname(filename).substr(1);

      if (this.isValidExtension(fileExtension)) {
        let ast: any;

        try {
          ast = gonzales.parse(content, {
            syntax: fileExtension,
          });
        } catch (e) {
          this.logger.warn('parse', { ...e, filename });
          return;
        }

        const rules = slRules(slConfig(options));

        return rules
          .filter(
            (rule: SlRule) => !!this._defaultOptions.resolvers[rule.rule.name],
          )
          .map((rule: SlRule) => {
            const { name } = rule.rule;
            const Module = this.getModule(name);

            const detects = rule.rule.detect(ast, rule);

            if (detects.length > 0) {
              const resolver = new Module(ast, rule);
              this.logger.verbose(
                'fix',
                `Running resolver ${name} on ${filename}`,
              );

              const resolvedTree = resolver.fix();
              return onResolve(filename, rule, resolvedTree);
            }
          });
      }
    }
  }

  public getModule(name: string): any {
    return require(`./resolvers/${name}`).default;
  }

  public isValidExtension(fileExtension: string): boolean {
    return this._defaultOptions.syntax.include.includes(fileExtension);
  }

  get logger() {
    return this._logger;
  }
}
