import merge from 'merge';

import { ConfigOpts } from '@src/types';
import { cosmiconfigSync as configSync } from 'cosmiconfig';
import { safeLoad } from 'js-yaml';
import { LintOpts } from 'sass-lint';

const defaultSearchPlaces = (moduleName: string) => [
  'package.json',
  `.${moduleName}rc`,
  `.${moduleName}.json`,
  `.${moduleName}.yaml`,
  `.${moduleName}.yml`,
  `${moduleName}.config.js`,
];

export function loadDefaults(): ConfigOpts {
  return safeLoad('../config/default.yml');
}

export enum CONFIG_TYPE {
  SASS_LINT = 'sass_lint',
  SASS_LINT_AUTO_FIX = 'sass_lint_auto_fix',
}

export function getConfig<T extends CONFIG_TYPE>(
  moduleName: T,
  filepath?: string,
): T extends CONFIG_TYPE.SASS_LINT
  ? LintOpts
  : T extends CONFIG_TYPE.SASS_LINT_AUTO_FIX
  ? ConfigOpts
  : Record<string, any> {
  const explorer = configSync(moduleName, {
    searchPlaces: defaultSearchPlaces(moduleName),
  });

  const resolvedConfig = filepath ? explorer.load(filepath) : explorer.search();

  if (resolvedConfig) {
    return resolvedConfig.config;
  }
  return {} as any;
}

export const mergeConfig = <A, B>(baseConfig: A, extendedConfig: B) =>
  merge.recursive(true, baseConfig, extendedConfig);
