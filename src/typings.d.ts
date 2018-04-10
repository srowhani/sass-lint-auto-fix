import AbstractSyntaxTree from './resolvers/typings/abstract-syntax-tree';
import SlRule from './resolvers/typings/sass-lint-rule';

export interface SlfRunOptions {
  onResolve(filename: string, rule: SlRule, ast: AbstractSyntaxTree): void;
}

export interface SlfRunConfig {
  filename: string;
  rule: SlRule;
  resolvedTree: AbstractSyntaxTree;
}

export interface SlfParserOptions {
  include?: string;
  ignore?: string[];
  syntax?: SlfParserSyntaxOptions;
  resolvers?: any;
}

interface SlfParserSyntaxOptions {
  include: string[];
}
