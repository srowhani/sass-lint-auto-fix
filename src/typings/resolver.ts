import { AbstractSyntaxTree } from './abstract-syntax-tree';
import { SlRule } from './sass-lint-rule';

export interface ResolverConstructable {
  new (ast: AbstractSyntaxTree, parser: SlRule): Resolver;
}

export interface Resolver {
  ast: AbstractSyntaxTree;
  parser: SlRule;
  fix(): AbstractSyntaxTree;
}
