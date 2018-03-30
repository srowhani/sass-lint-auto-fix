import BaseResolver from './base-resolver';
import AbstractSyntaxTree, { TreeNode } from './typings/abstract-syntax-tree';
import SlRule from './typings/sass-lint-rule';

export default class SpaceAfterColon extends BaseResolver {
  fix(): AbstractSyntaxTree {
    const {
      ast,
      parser
    } = this;

    this.traverse((delimiter: TreeNode, i: number, parent: TreeNode) => {
      if (delimiter.content === ':') {
        const next = parent.content[i + 1];
        const include = parser.options.include;
        if (next && next.is('space')) {
          if (!include) {
            parent.content = parent.content.splice(i + 1, 1);
          }
        }
        else if (parser.options.include) {
          delimiter.content += ' ';
        }
      }
    })

    return ast;
  }

  traverse(callback: Function): AbstractSyntaxTree {
    this.ast.traverseByTypes(['propertyDelimiter', 'operator'],
      (delimiter: TreeNode, i: number, parent: TreeNode) => callback(delimiter, i, parent));

    return this.ast;
  };
}
