import BaseResolver from './base-resolver';

import { Node } from 'gonzales-pe-sl';
import { SlRule } from 'sass-lint';

export default class HexLength extends BaseResolver {
  private _lengths: any;

  constructor(ast: Node, parser: SlRule) {
    super(ast, parser);
    this._lengths = {
      short: 3,
      long: 6,
    };
  }

  public fix(): Node {
    const { ast } = this;
    ast.traverseByType('color', (node: Node) => {
      const colorValue = node.content;
      if (this.shouldShorten(colorValue)) {
        node.content = this.transformLongToShort(colorValue);
      } else if (this.shouldLengthen(colorValue)) {
        node.content = this.transformShortToLong(colorValue);
      }
    });

    return ast;
  }

  private shouldShorten(hex: string): boolean {
    return this.parser.options.style === 'short' && this.canShorten(hex);
  }

  private shouldLengthen(hex: string): boolean {
    return (
      this.parser.options.style === 'long' && hex.length === this._lengths.short
    );
  }

  private canShorten(hex: string): boolean {
    return (
      hex.length === this._lengths.long &&
      hex[0] === hex[1] &&
      hex[2] === hex[3] &&
      hex[4] === hex[5]
    );
  }

  private transformLongToShort(hex: string): string {
    return [0, 2, 4].reduce((acc: string, idx: number) => acc + hex[idx], '');
  }

  private transformShortToLong(hex: string): string {
    return hex.split('').reduce((acc: string, c: string) => acc + c + c, '');
  }
}
