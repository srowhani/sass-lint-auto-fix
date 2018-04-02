import BaseResolver from './base-resolver';
import AbstractSyntaxTree, { TreeNode } from './typings/abstract-syntax-tree';
import SlRule from './typings/sass-lint-rule';

export default class BorderZero extends BaseResolver {
  private _borders: Array<string>;
  private _allowedConventions: Array<string>;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._borders = [
      'border',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
    ];
    this._allowedConventions = ['0', 'none'];
  }

  fix(): AbstractSyntaxTree {
    return this.traverse(
      this.ast,
      (node: TreeNode) => (node.content = this.parser.options.convention),
    );
  }

  traverse(ast: AbstractSyntaxTree, callback: Function): AbstractSyntaxTree {
    ast.traverseByType('declaration', (decl: TreeNode) => {
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
              if (node.content === '0' || node.content === 'none') {
                return callback(node);
              }
            }
          }
        }
        return item;
      });
    });
    return ast;
  }

  get borders(): string[] {
    return this._borders;
  }

  get allowedConventions(): string[] {
    return this._allowedConventions;
  }
}
