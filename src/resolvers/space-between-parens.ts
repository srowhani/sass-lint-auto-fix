import { AbstractSyntaxTree, TreeNode } from '@src/types';
import BaseResolver from './base-resolver';

const gonzales = require('gonzales-pe-sl');

export default class SpaceBetweenParens extends BaseResolver {
  public fix(): AbstractSyntaxTree {
    const { ast } = this;

    ast.traverseByType('arguments', (node: TreeNode) => {
      const first = node.first();
      const last = node.last();
      const spaceNode = gonzales.createNode({
        type: 'space',
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
