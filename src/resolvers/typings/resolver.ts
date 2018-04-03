import AbstractSyntaxTree from './abstract-syntax-tree';
import SlRule from './sass-lint-rule';

export default interface Resolver {
  ast: AbstractSyntaxTree;
  parser: SlRule;
  fix(): AbstractSyntaxTree;
};
