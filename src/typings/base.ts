import { ILogger } from '@src/helpers';
import { AbstractSyntaxTree, SlRule } from '@src/typings';

export interface SlfParserOptions {
  include?: string;
  ignore?: string[];
  syntax?: SlfParserSyntaxOptions;
  resolvers?: any;
}

export interface SlfParserSyntaxOptions {
  include: string[];
}

export interface Resolution {
  filename: string;
  rule: SlRule;
  ast: AbstractSyntaxTree;
}

export enum ValidFileType {
  scss = 'scss',
  sass = 'sass',
}

export interface Ruleset {
  [ruleName: string]: number | { [ruleOption: string]: any };
}

export interface ConfigOpts {
  logger: ILogger;
  slRules?: any;
  slConfig?: any;
  files: {
    include: string;
    ignore?: string;
  };
  syntax: {
    include: ValidFileType[];
  };
  resolvers: Ruleset;
  options: {
    optOut: boolean;
  };
}

export interface LintOpts {
  options: {
    formatter?: string;
    'merge-default-rules'?: boolean;
    'cache-config'?: boolean;
  };
  files: {
    include: string;
  };
  rules: Ruleset;
}

export interface CreateModuleConfig {
  ast: AbstractSyntaxTree;
  name: string;
  rule: SlRule;
}
