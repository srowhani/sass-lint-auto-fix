import BaseResolver from './base-resolver';
import { AbstractSyntaxTree, TreeNode } from './typings';

export default class SpaceAfterColon extends BaseResolver {
  public fix(): AbstractSyntaxTree {
    const { ast, parser } = this;
    const include = parser.options.include;

    ast.traverseByTypes(
      ['propertyDelimiter', 'operator'],
      (delimiter: TreeNode, i: number, parent: TreeNode) => {
        if (delimiter.content === ':') {
          const next = parent.content[i + 1] || {};
          if (next.type === 'space') {
            if (!include) {
              parent.content.splice(i + 1, 1);
            }
          } else if (parser.options.include) {
            delimiter.content += ' ';
          }
        }
      },
    );
    return ast;
  }
}
