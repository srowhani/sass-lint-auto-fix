import AbstractSyntaxTree, { TreeNode } from './typings/abstract-syntax-tree';

import BaseResolver from './base-resolver';

export default class SpaceBeforeColon extends BaseResolver {
  public fix(): AbstractSyntaxTree {
    const { ast, parser } = this;

    this.traverse((delimiter: TreeNode, i: number, parent: TreeNode) => {
      const include = parser.options.include;

      if (delimiter.content === ':') {
        const previous = parent.content[i - 1];
        if (previous.is('space')) {
          if (!include) {
            // no space allowed
            parent.content.splice(i - 1, 1);
          }
        } else if (include) {
          previous.content += ' ';
        }
      }
    });

    return ast;
  }

  private traverse(
    callback: (delimiter: TreeNode, i: number, parent: TreeNode) => void,
  ): AbstractSyntaxTree {
    this.ast.traverseByTypes(
      ['propertyDelimiter', 'operator'],
      (delimNode: TreeNode, index: number, parentNode: TreeNode) =>
        callback(delimNode, index, parentNode),
    );
    return this.ast;
  }
}
