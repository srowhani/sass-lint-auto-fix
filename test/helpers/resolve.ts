import Logger from '@src/helpers/logger';
import AbstractSyntaxTree from '@src/resolvers/typings/abstract-syntax-tree';
import SlRule from '@src/resolvers/typings/sass-lint-rule';
import SlAutoFix from '@src/sass-lint-auto-fix';

const path = require('path');
const fs = require('fs');
const gonzales = require('gonzales-pe-sl');

const sassLint = require('sass-lint');

export default (
  pattern: string,
  lintOptions: any,
  onResolve: (filename: string, rule: SlRule, ast: AbstractSyntaxTree) => void,
) => {
  const options = {
    files: {
      include: pattern,
    },
    resolvers: { [Object.keys(lintOptions)[0]]: 1 },
    syntax: {
      include: ['scss', 'sass'],
    },
  };

  const slaf = new SlAutoFix(options);
  slaf._logger = new Logger(true);

  slaf.run(
    {
      options: {
        'merge-default-rules': false,
        'cache-config': false,
      },
      rules: { ...lintOptions },
    },
    onResolve,
  );
};

export function ast(filename: string): AbstractSyntaxTree {
  const fileExtension = path.extname(filename).substr(1);

  const file = fs.readFileSync(filename);
  return gonzales.parse(file.toString(), {
    syntax: fileExtension,
  });
}

export function detect(text: string, format: string, options: any) {
  const file = {
    text,
    format,
    filename: null,
  };

  return sassLint.lintText(file, {
    options: {
      'merge-default-rules': false,
      'cache-config': false,
    },
    rules: { ...options },
  });
}
//
// export function detect(detectRule: string, ast: AbstractSyntaxTree): any[] {
//   return rules
//     .filter((rule: any) => rule.rule.name === detectRule)
//     .reduce(
//       (accumulator: any[], rule: any) => {
//           accumulator.push(...rule.rule.detect(ast, rule))
//           return accumulator;
//       }, []
//     );
// }

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
    rules: { ...options },
  });
}
