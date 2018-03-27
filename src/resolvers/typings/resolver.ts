import { AbstractSyntaxTree } from './abstract-syntax-tree';
import { SlRule } from './sass-lint-rule';

export interface Resolver {
  ast: AbstractSyntaxTree;
  parser: SlRule;

  fix(): AbstractSyntaxTree
}
