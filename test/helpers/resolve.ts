import { createLogger, ILogger } from '@src/helpers';
import { autoFixSassFactory } from '@src/sass-lint-auto-fix';

import {
  AbstractSyntaxTree,
  ConfigOpts,
  LintOpts,
  Resolution,
  Ruleset,
  ValidFileType,
} from '@src/typings';

const fs = require('fs');
const path = require('path');
const gonzales = require('gonzales-pe-sl');
const sassLint = require('sass-lint');

export interface MockLintConfigParams {
  pattern?: string;
  lintRules: Ruleset;
}

export function createMockLintOptions({
  pattern,
  lintRules,
}: MockLintConfigParams): LintOpts {
  const lintOpts = {
    options: {
      'merge-default-rules': false,
      'cache-config': false,
    },
    rules: { ...lintRules },
  } as LintOpts;

  if (pattern) {
    lintOpts.files = {
      include: pattern,
    };
  }

  return lintOpts;
}

export function* resolvePattern(
  pattern: string,
  lintRules: Ruleset,
  logger: ILogger,
): IterableIterator<Resolution> {
  const configOptions: ConfigOpts = {
    logger,
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

  const linterOptions: LintOpts = createMockLintOptions({ pattern, lintRules });

  const sassLintFix = autoFixSassFactory(configOptions);
  for (const resolution of sassLintFix(linterOptions)) {
    yield resolution;
  }
}

export function resolveFirst(
  pattern: string,
  lintRules: Ruleset,
  logger: ILogger = createLogger({ silentEnabled: true }),
): Resolution {
  const result = resolvePattern(pattern, lintRules, logger).next();

  if (result.value === undefined) {
    throw Error(`No resolutions exist for given pattern: ${pattern}`);
  }

  return result.value;
}

export function ast(filename: string): AbstractSyntaxTree {
  const fileExtension = path.extname(filename).substr(1);

  const file = fs.readFileSync(filename);
  return gonzales.parse(file.toString(), {
    syntax: fileExtension,
  });
}

export function detect(
  text: string,
  format: ValidFileType,
  lintRules: Ruleset,
) {
  const file = {
    text,
    format,
    filename: null,
  };

  return sassLint.lintText(file, createMockLintOptions({ lintRules }));
}

export function lint(filename: string, lintRules: Ruleset): any {
  const file = {
    text: fs.readFileSync(filename).toString(),
    format: path.extname(filename).substr(1),
    filename,
  };

  return sassLint.lintText(
    file,
    createMockLintOptions({
      pattern: filename,
      lintRules,
    }),
  );
}

export function tree(filename: string): AbstractSyntaxTree {
  const content = fs.readFileSync(filename).toString();
  const syntax = path
    .extname(filename)
    .substr(1)
    .toLowerCase();

  return gonzales.parse(content, {
    syntax,
  }) as AbstractSyntaxTree;
}
