import { AbstractSyntaxTree, SlRule, TreeNode } from '@src/typings';

import BaseResolver from './base-resolver';

export default class BorderZero extends BaseResolver {
  private _borders: string[];
  private _allowedConventions: string[];
  private convention: any;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
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

  public fix(): AbstractSyntaxTree {
    return this.traverse((node: TreeNode) => (node.content = this.convention));
  }

  private traverse(callback: (node: TreeNode) => void): AbstractSyntaxTree {
    this.ast.traverseByType('declaration', (decl: TreeNode) => {
      let isBorder = false;

      decl.traverse((item: TreeNode) => {
        if (item.type === 'property') {
          item.traverse((childNode: TreeNode) => {
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
