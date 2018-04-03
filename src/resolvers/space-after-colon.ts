import AbstractSyntaxTree, {
  TreeNode,
} from '@src/resolvers/typings/abstract-syntax-tree';

import BaseResolver from '@src/resolvers/base-resolver';

export default class SpaceAfterColon extends BaseResolver {
  public fix(): AbstractSyntaxTree {
    const { ast, parser } = this;

    this.traverse((delimiter: TreeNode, i: number, parent: TreeNode) => {
      if (delimiter.content === ':') {
        const next = parent.content[i + 1];
        const include = parser.options.include;
        if (next && next.is('space')) {
          if (!include) {
            parent.content = parent.content.splice(i + 1, 1);
          }
        } else if (parser.options.include) {
          delimiter.content += ' ';
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
      (delimiter: TreeNode, i: number, parent: TreeNode) =>
        callback(delimiter, i, parent),
    );

    return this.ast;
  }
}
