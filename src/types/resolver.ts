import { SlDetect, SlRule } from 'sass-lint';
import { AbstractSyntaxTree } from './abstract-syntax-tree';

export type ResolverConstructable = new (
  ast: AbstractSyntaxTree,
  parser: SlRule,
) => Resolver;

export interface Resolver {
  ast: AbstractSyntaxTree;
  parser: SlRule;
  fix(detects: SlDetect[]): AbstractSyntaxTree;
}
