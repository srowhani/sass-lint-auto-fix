import { Node } from 'gonzales-pe-sl';

import { SlRule } from 'sass-lint';
import BaseResolver from './base-resolver';

export default class BorderZero extends BaseResolver {
  private _borders: string[];
  private _allowedConventions: string[];
  private convention: any;

  constructor(ast: Node, parser: SlRule) {
    super(ast, parser);
    this._borders = [
      'border',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
    ];

    this.convention = this.parser.options.convention;

    this._allowedConventions = ['0', 'none'];
  }

  public fix(): Node {
    return this.traverse(
      (node: Node) => (node.content = String(this.convention)),
    );
  }

  private traverse(callback: (node: Node) => void): Node {
    this.ast.traverseByType('declaration', (decl: Node) => {
      let isBorder = false;

      decl.traverse((item: Node) => {
        if (item.type === 'property') {
          item.traverse((childNode: Node) => {
            if (this.borders.indexOf(childNode.content) !== -1) {
              isBorder = true;
            }
          });
        }

        if (isBorder) {
          if (item.type === 'value') {
            const node = item.content[0];
            if (node.type === 'number' || node.type === 'ident') {
              if (this.allowedConventions.includes(node.content)) {
                callback(item);
              }
            }
          }
        }
        return item;
      });
    });
    return this.ast;
  }

  get borders(): string[] {
    return this._borders;
  }

  get allowedConventions(): string[] {
    return this._allowedConventions;
  }
}
