import AbstractSyntaxTree from './typings/abstract-syntax-tree';

import Resolver from './typings/resolver';
import SlRule from './typings/sass-lint-rule';

export default abstract class BaseResolver implements Resolver {
  private _ast: AbstractSyntaxTree;
  private _parser: SlRule;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    this._ast = ast;
    this._parser = parser;
  }

  public abstract fix(): AbstractSyntaxTree;

  get ast() {
    return this._ast;
  }

  get parser() {
    return this._parser;
  }
}
