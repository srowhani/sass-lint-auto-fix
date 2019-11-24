import { Node } from 'gonzales-pe-sl';
import { SlRule } from 'sass-lint';
import BaseResolver from './base-resolver';

export default class ZeroUnit extends BaseResolver {
  private _unitsRegex: RegExp;

  constructor(ast: Node, parser: SlRule) {
    super(ast, parser);
    this._unitsRegex = /(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)/g;
  }

  public fix(): Node {
    const { ast, parser } = this;

    if (parser.options.include) {
      // end early, user should specify units.
      return ast;
    }

    ast.traverseByType('number', (item: Node, i: number, parent: Node) => {
      if (parent.is('dimension')) {
        const nextNode = parent.content[i + 1] || {};
        if (item.content === '0' && nextNode.type === 'ident') {
          if (nextNode.content.match(this._unitsRegex)) {
            parent.removeChild(i + 1);
          }
        }
      }
    });

    return ast;
  }
}
