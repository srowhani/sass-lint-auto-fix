import BaseResolver from './base-resolver';
import AbstractSyntaxTree, { TreeNode } from './typings/abstract-syntax-tree';
const gonzales = require('gonzales-pe-sl');

const helpers = require('sass-lint/lib/helpers');

export default class EmptyLineBetweenBlocks extends BaseResolver {
  public fix(): AbstractSyntaxTree {
    const { ast } = this;

    ast.traverseByType('ruleset', (_: TreeNode, i: any, p: any) => {
      let block = {};
      if (ast.syntax === 'scss') {
        block = this.findNearestReturnSCSS(p, i);
      }

      if (ast.syntax === 'sass') {
        block = this.findNearestReturnSass(p, i, 0);
      }

      if (this.shouldInjectEmptyLine(block)) {
        const spaceNode = gonzales.createNode({
          type: 'space',
          content: '\n',
        });

        p.content.splice(i, 0, spaceNode);
      }
    });

    return ast;
  }

  private findNearestReturnSCSS(parent: any, i: any): any {
    let previous;
    let doublePrevious;
    let space;

    if (parent.content[i - 1]) {
      previous = parent.content[i - 1];

      if (i >= 2) {
        doublePrevious = parent.content[i - 2];

        // First check to see that the previous line is not a new line as if it is
        // we don't want to recursively run the function again

        if (!helpers.isEmptyLine(previous.content)) {
          if (doublePrevious.type.indexOf('Comment') !== -1) {
            return this.findNearestReturnSCSS(parent, i - 1);
          }
        }
      }

      if (i >= 1) {
        if (previous.type.indexOf('Comment') !== -1) {
          return this.findNearestReturnSCSS(parent, i - 1);
        }

        if (previous.type === 'space') {
          space = helpers.isEmptyLine(previous.content);

          // If there's not a new line and it's the first within the block, ignore
          if (!space && i - 1 === 0) {
            return false;
          }

          return {
            space,
            previous,
          };
        }
      }
    }
    return false;
  }

  private findNearestReturnSass(parent: any, i: any, counter: any): any {
    let previous;

    if (parent.content[i - 1]) {
      previous = parent.content[i - 1];

      if (counter === 2) {
        return {
          space: true,
          previous,
        };
      }

      if (previous.is('space') || previous.is('declarationDelimiter')) {
        if (helpers.hasEOL(previous.content)) {
          counter++;
        }

        return this.findNearestReturnSass(parent, i - 1, counter);
      } else if (previous.is('ruleset') || previous.is('include')) {
        // If ruleset, we must reset the parent to be the previous node and
        // loop through that
        const previousNode = previous.content[previous.content.length - 1];

        // Set the i parameter for findNearestReturn to be the length of the
        // content array in order to get the last one
        return this.findNearestReturnSass(
          previousNode,
          previousNode.content.length,
          counter,
        );
      } else {
        counter = 0;

        if (previous.type.indexOf('Comment') !== -1) {
          // If it's the first line
          if (previous.start.line === 1) {
            return {
              space: true,
              previous,
            };
          }

          return this.findNearestReturnSass(parent, i - 1, counter);
        }
      }
    }

    return {
      space: false,
      previous,
    };
  }

  private shouldInjectEmptyLine(block: any) {
    return this.parser.options.include && block.space === false;
  }
}
