import { AbstractSyntaxTree, TreeNode } from '@src/typings';
import BaseResolver from './base-resolver';

const gonzales = require('gonzales-pe-sl');

export default class SpaceBeforeBang extends BaseResolver {
  public fix(): AbstractSyntaxTree {
    const { ast } = this;

    ast.traverseByTypes(
      ['important', 'default', 'global', 'optional'],
      (_: any, index: number, parent: TreeNode) => {
        const prev = parent.content[index - 1] || {};
        const isSpace = prev.type === 'space';

        if (this.shouldAddSpaceBeforeBang()) {
          if (!isSpace) {
            const spaceNode = gonzales.createNode({
              type: 'space',
              content: ' ',
            });
            parent.content.splice(index, 0, spaceNode);
          }
        } else if (isSpace) {
          parent.removeChild(index - 1);
        }
      },
    );
    return ast;
  }

  private shouldAddSpaceBeforeBang(): boolean {
    return this.parser.options.include;
  }
}
