import { SlRule, AbstractSyntaxTree } from "@src/resolvers/typings";
import { Logger } from "@src/helpers";


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
  filename: string,
  rule: SlRule,
  ast: AbstractSyntaxTree,
}

export enum ValidFileType {
  scss = 'scss',
  sass = 'sass',
}

export interface ConfigOpts {
  logger: Logger;
  slRules: any;
  slConfig: any;
  files: {
    include: string,
    ignore: string,
  };
  syntax: {
    include: ValidFileType,
  };
  resolvers: {
    [resolverName: string]: number | { [resolverOption: string]: any },
  },
  options: {
    silent?: boolean,
    optOut: boolean,
  }
}

export interface LintOpts {
  options: {
    'formatter': string,
    'merge-default-rules': boolean,
    'cache-config': boolean,
  };
  files: {
    include: string,
  };
  rules: {
    [ruleName: string]: number | { [ruleOption: string]: any },
  }
}