import { createLogger } from '@src/helpers';
import { AbstractSyntaxTree, SlRule } from '@src/resolvers/typings';
import {
  ConfigOpts,
  LintOpts,
  Resolution,
  Ruleset,
  ValidFileType,
} from '@src/types';

import { autoFixSassFactory } from '@src/sass-lint-auto-fix';

const path = require('path');
const fs = require('fs');
const gonzales = require('gonzales-pe-sl');

const sassLint = require('sass-lint');

export function* resolvePattern(
  pattern: string,
  lintRules: Ruleset,
): IterableIterator<Resolution> {
  const configOptions: ConfigOpts = {
    logger: createLogger({ silentEnabled: true }),
    files: {
      include: pattern,
    },
    resolvers: { [Object.keys(lintRules)[0]]: 1 },
    syntax: {
      include: [ValidFileType.scss, ValidFileType.sass],
    },
    options: {
      optOut: true,
    },
  };

  const linterOptions: LintOpts = {
    files: {
      include: pattern,
    },
    options: {
      'merge-default-rules': false,
      'cache-config': false,
    },
    rules: { ...lintRules },
  };

  const sassLintFix = autoFixSassFactory(configOptions);
  for (const resolution of sassLintFix(linterOptions)) {
    yield resolution;
  }
}

export function resolveFirst(pattern: string, lintRules: Ruleset): Resolution {
  return resolvePattern(pattern, lintRules).next().value;
}

export function ast(filename: string): AbstractSyntaxTree {
  const fileExtension = path.extname(filename).substr(1);

  const file = fs.readFileSync(filename);
  return gonzales.parse(file.toString(), {
    syntax: fileExtension,
  });
}

export function detect(text: string, format: ValidFileType, options: any) {
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
