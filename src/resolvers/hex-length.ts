import BaseResolver from './base-resolver';
import AbstractSyntaxTree, { TreeNode } from './typings/abstract-syntax-tree';
import SlRule from './typings/sass-lint-rule';

const gonzales = require('gonzales-pe-sl');

export default class HexLength extends BaseResolver {
  _lengths: any;

  constructor (ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._lengths = {
      short: 3,
      long: 6
    }
  }

  fix(): AbstractSyntaxTree {
    const {
      ast,
      parser,
    } = this;
    ast.traverseByType('color', (node: TreeNode) => {
      const colorValue = node.content;
      if (this.shouldShorten(colorValue)) {
        node.content = this.transformLongToShort(colorValue)
      } else if (this.shouldLengthen(colorValue)) {
        node.content = this.transformShortToLong(colorValue);
      }
    })

    return ast;
  }

  shouldShorten(hex: string): boolean {
    return this.parser.options.style === 'short'
      && this.canShorten(hex);
  }

  shouldLengthen(hex: string) : boolean {
    return this.parser.options.style === 'long'
      && hex.length === this._lengths.short;
  }

  canShorten (hex: string) : boolean {
    return hex.length === this._lengths.long
      && hex[0] === hex[1]
      && hex[2] === hex[3]
      && hex[4] === hex[5];
  }

  transformLongToShort(hex: string): string {
    return [0, 2, 4].reduce((acc: string, idx: number) => acc + hex[idx], '');
  }

  transformShortToLong(hex: string): string {
    return hex.split('').reduce((acc: string, c: string) => acc + c + c, '');
  }

}
