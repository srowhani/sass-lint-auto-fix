import AbstractSyntaxTree, { TreeNode } from './typings/abstract-syntax-tree';
import SlRule from './typings/sass-lint-rule';

import BaseResolver from './base-resolver';

export default class UrlQuotes extends BaseResolver {
  private _variableRegex: RegExp;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._variableRegex = /^[\$]/;
  }

  public fix(): AbstractSyntaxTree {
    const { ast } = this;

    ast.traverseByType('uri', (node: TreeNode) => {
      node.traverse(item => {
        if (item.is('raw')) {
          if (!this.isVariable(item)) {
            item.content = `'${item.content}'`;
          }
        }
      });
    });

    return ast;
  }

  private isVariable(item: TreeNode): boolean {
    return item.content.match(this._variableRegex);
  }
}
