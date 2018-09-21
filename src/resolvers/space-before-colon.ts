import { AbstractSyntaxTree, TreeNode } from '@src/typings';
import BaseResolver from './base-resolver';

export default class SpaceBeforeColon extends BaseResolver {
  public fix(): AbstractSyntaxTree {
    const { ast, parser } = this;
    const include = parser.options.include;

    ast.traverseByTypes(
      ['propertyDelimiter', 'operator'],
      (delimiter: TreeNode, i: number, parent: TreeNode) => {
        if (delimiter.content === ':') {
          const previous = parent.content[i - 1] || {};
          if (previous.type === 'space') {
            if (!include) {
              // no space allowed
              parent.content.splice(i - 1, 1);
            }
          } else if (include) {
            previous.content += ' ';
          }
        }
      },
    );
    return ast;
  }
}
