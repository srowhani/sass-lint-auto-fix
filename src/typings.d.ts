import { Logger } from '@src/helpers';
import { AbstractSyntaxTree, SlRule } from '@src/resolvers/typings';

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

export interface ConfigOpts {
  logger: Logger;
  slRules?: any;
  slConfig?: any;
  files: {
    include: string;
    ignore: string;
  };
  syntax: {
    include: ValidFileType;
  };
  resolvers: {
    [resolverName: string]: number | { [resolverOption: string]: any };
  };
  options: {
    optOut: boolean;
  };
}

export interface LintOpts {
  options: {
    formatter: string;
    'merge-default-rules': boolean;
    'cache-config': boolean;
  };
  files: {
    include: string;
  };
  rules: {
    [ruleName: string]: number | { [ruleOption: string]: any };
  };
}

export interface CreateModuleConfig {
  ast: AbstractSyntaxTree;
  name: string;
  rule: SlRule;
}
