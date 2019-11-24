import { Resolver } from '@src/types';
import { Node } from 'gonzales-pe-sl';
import { SlDetect, SlRule } from 'sass-lint';

export default abstract class BaseResolver implements Resolver {
  private _ast: Node;
  private _parser: SlRule;

  constructor(ast: Node, parser: SlRule) {
    this._ast = ast;
    this._parser = parser;
  }

  public abstract fix(detects: SlDetect[]): Node;

  get ast() {
    return this._ast;
  }

  get parser() {
    return this._parser;
  }
}
