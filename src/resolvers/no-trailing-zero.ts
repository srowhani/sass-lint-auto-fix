import BaseResolver from './base-resolver';
import AbstractSyntaxTree, { TreeNode } from './typings/abstract-syntax-tree';
import SlRule from './typings/sass-lint-rule';

export default class NoTrailingZero extends BaseResolver {
  private _trailingZeroRegex: RegExp;
  private _trailingPeriodRegex: RegExp;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._trailingZeroRegex = /^(\d+\.|\.)+(\d*?)0+$/;
    this._trailingPeriodRegex = /(.*)\./;
  }

  fix(): AbstractSyntaxTree {
    const { ast } = this;

    ast.traverseByType('number', (node: TreeNode) => {
      let value = node.content;
      if (this.hasTrailingZero(value) !== null) {
        value = this.removeTrailingZero(value);
        value = this.removeTrailingPeriod(value);
        node.content = value;
      }
    });

    return ast;
  }

  hasTrailingZero(value: string): string[] | null {
    return value.match(this._trailingZeroRegex);
  }

  removeTrailingZero(value: string): string {
    return value.replace(this._trailingZeroRegex, '$1' + '$2'); // eslint-disable-line no-useless-concat
  }

  removeTrailingPeriod(value: string): string {
    return value.replace(this._trailingPeriodRegex, '$1') || '0';
  }
}
