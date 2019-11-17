import { ILogger } from '@src/helpers';
import { AbstractSyntaxTree } from '@src/types/abstract-syntax-tree';
import { Ruleset, SlRule } from 'sass-lint';

export enum ValidFileType {
  scss = 'scss',
  sass = 'sass',
}

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

export interface CreateModuleConfig {
  ast: AbstractSyntaxTree;
  name: string;
  rule: SlRule;
}
