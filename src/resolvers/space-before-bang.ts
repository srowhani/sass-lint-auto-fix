import { createNode, Node } from 'gonzales-pe-sl';
import BaseResolver from './base-resolver';

export default class SpaceBeforeBang extends BaseResolver {
  public fix(): Node {
    const { ast } = this;

    ast.traverseByTypes(
      ['important', 'default', 'global', 'optional'],
      (_: any, index: number, parent: Node) => {
        const prev = parent.content[index - 1] || {};
        const isSpace = prev.type === 'space';

        if (this.shouldAddSpaceBeforeBang()) {
          if (!isSpace) {
            const spaceNode = createNode({
              type: 'space',
              syntax: ast.syntax,
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
