import AbstractSyntaxTree from '@src/resolvers/typings/abstract-syntax-tree';
import SlRule from '@src/resolvers/typings/sass-lint-rule';

export interface SlfRunOptions {
  onResolve(slRunConfig: SlfRunConfig): void;
}

export interface SlfRunConfig {
  filename: string;
  rule: SlRule;
  ast: AbstractSyntaxTree;
}
