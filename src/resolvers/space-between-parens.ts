import { createNode, Node } from 'gonzales-pe-sl';
import BaseResolver from './base-resolver';

export default class SpaceBetweenParens extends BaseResolver {
  public fix(): Node {
    const { ast } = this;

    ast.traverseByType('arguments', (node) => {
      const first = node.first();
      const last = node.last();
      const spaceNode = createNode({
        type: 'space',
        syntax: ast.syntax,
        content: ' ',
      });

      if (node.length === 0) {
        return;
      }

      if (!first || !last) {
        return;
      }

      if (this.parser.options.include) {
        if (!first.is('space')) {
          // Add space node to the begining
          node.content.splice(0, 0, spaceNode);
        }
        if (!last.is('space')) {
          // Add space node to the end
          node.content.push(spaceNode);
        }
      } else {
        if (first.is('space')) {
          // Remove space node from the begining
          node.removeChild(0);
        }
        if (last.is('space')) {
          // Remove space node from the end
          node.removeChild(-1);
        }
      }
    });
    return ast;
  }
}
