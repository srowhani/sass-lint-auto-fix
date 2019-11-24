import { Node } from 'gonzales-pe-sl';
import { SlRule } from 'sass-lint';
import BaseResolver from './base-resolver';

export default class NoTrailingZero extends BaseResolver {
  private _trailingZeroRegex: RegExp;

  constructor(ast: Node, parser: SlRule) {
    super(ast, parser);
    this._trailingZeroRegex = /^(\d+\.|\.)+(\d*?)0+$/;
  }

  public fix(): Node {
    const { ast } = this;

    ast.traverseByType('number', (node: Node) => {
      const value = node.content;
      if (this.hasTrailingZero(value)) {
        // Converting to number and back to string drops trailing zeros
        node.content = Number(value).toString();
      }
    });

    return ast;
  }

  private hasTrailingZero(value: string): boolean {
    return !!value.match(this._trailingZeroRegex);
  }
}
