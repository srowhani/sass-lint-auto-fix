import AbstractSyntaxTree from './resolvers/typings/abstract-syntax-tree';
import SlRule from './resolvers/typings/sass-lint-rule';

export interface SlfRunOptions {
  onResolve(filename: string, rule: SlRule, ast: AbstractSyntaxTree) : void;
}
