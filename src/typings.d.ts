import AbstractSyntaxTree from './resolvers/typings/abstract-syntax-tree';
import SlRule from './resolvers/typings/sass-lint-rule';

export interface SlfRunOptions {
  onResolve(slRunConfig: SlfRunConfig): void;
}

export interface SlfRunConfig {
  filename: string;
  rule: SlRule;
  resolvedTree: AbstractSyntaxTree;
}
