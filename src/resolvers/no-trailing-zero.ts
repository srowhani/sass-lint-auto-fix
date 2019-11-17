import { AbstractSyntaxTree, TreeNode } from '@src/types';
import { SlRule } from 'sass-lint';
import BaseResolver from './base-resolver';

export default class NoTrailingZero extends BaseResolver {
  private _trailingZeroRegex: RegExp;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._trailingZeroRegex = /^(\d+\.|\.)+(\d*?)0+$/;
  }

  public fix(): AbstractSyntaxTree {
    const { ast } = this;

    ast.traverseByType('number', (node: TreeNode) => {
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
