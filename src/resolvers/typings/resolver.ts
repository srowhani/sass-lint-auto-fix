import { AbstractSyntaxTree } from './abstract-syntax-tree';
import { SlRule } from './sass-lint-rule';

export interface Resolver {
  new(ast: AbstractSyntaxTree, parser: SlRule): Resolver;
  ast: AbstractSyntaxTree;
  parser: SlRule;
  fix(): AbstractSyntaxTree;
};
