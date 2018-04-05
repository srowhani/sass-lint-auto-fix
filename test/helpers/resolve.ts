import AbstractSyntaxTree from '@src/resolvers/typings/abstract-syntax-tree';
import SlAutoFix from '@src/sass-lint-fix';
import { SlfRunConfig } from '@src/typings.d';
const path = require('path');
const fs = require('fs');
const gonzales = require('gonzales-pe-sl');

const slConfig = require('sass-lint/lib/config');
const slRules = require('sass-lint/lib/rules');

const sassLint = require('sass-lint');

const rules = slRules(slConfig());

export default (
  pattern: string,
  enabledResolvers: any,
  onResolve: (config: SlfRunConfig) => void,
) => {
  const options = {
    files: {
      include: pattern,
    },
    resolvers: enabledResolvers,
    syntax: {
      include: ['scss', 'sass'],
    },
  };

  const slaf = new SlAutoFix(options);
  slaf.run({
    onResolve,
  });
};

export function ast(filename: string): AbstractSyntaxTree {
  const fileExtension = path.extname(filename).substr(1);

  const file = fs.readFileSync(filename);
  return gonzales.parse(file.toString(), {
    syntax: fileExtension,
  });
}

export function detect(detectRule: string, ast: AbstractSyntaxTree): any[] {
  return rules
    .filter((rule: any) => rule.rule.name === detectRule)
    .reduce(
      (accumulator: any[], rule: any) => [
        ...accumulator,
        ...rule.rule.detect(ast, rule),
      ],
      [],
    );
}

export function lint(filename: string, options: any): any {
  const file = {
    text: fs.readFileSync(filename).toString(),
    format: path.extname(filename).substr(1),
    filename,
  };

  return sassLint.lintText(file, {
    options: {
      'merge-default-rules': false,
      'cache-config': false,
    },
    rules: options,
  });
}
