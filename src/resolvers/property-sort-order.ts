import { Nullable } from '@src/types';
import { Node, parse, SortNode } from 'gonzales-pe-sl';
import BaseResolver from './base-resolver';

const sassLintHelpers = require('sass-lint/lib/helpers');

enum SortOrderMethod {
  RECESS = 'recess',
  SMACSS = 'smacss',
  CONCENTRIC = 'concentric',
}

export default class PropertySortOrder extends BaseResolver {
  public fix() {
    const producedOutput = this.ast.toString().split('\n');

    this.ast.traverseByType('block', (block: Node) => {
      // Fix - if block is empty - do not attempt to sort properties.
      if (block.content.length === 0) {
        return;
      }

      const collectedDecl: SortNode[] = [];
      const matchingIndices: number[] = [];
      block.forEach('declaration', (declaration: Node, index: number) => {
        const prop = declaration.first('property') || declaration.first('customProperty');
        if (prop) {
          let nodeContainingName = prop.first('ident');

          // If the top level ident doesn't exist, we look for a nested variable ident instead
          if (!nodeContainingName) {
            const firstVariableNode = prop.first('variable');
            if (firstVariableNode) {
              nodeContainingName = firstVariableNode.first('ident');
            }
          }

          if (nodeContainingName) {
            const variable = prop.first('variable');

            collectedDecl.push({
              name: nodeContainingName.toString(),
              node: declaration,
              type: variable !== null ? 'variable' : 'property',
            });
            matchingIndices.push(index);
          }
        }
      });

      if (this.parser.options.order === 'alphabetical') {
        collectedDecl.sort((p, c) => {
          const endsEarlyOnVariablePrioritization = this.shouldEndEarly(p, c);

          if (endsEarlyOnVariablePrioritization !== null) {
            return endsEarlyOnVariablePrioritization;
          }

          return p.name.localeCompare(c.name);
        });
      } else {
        collectedDecl.sort((p, c) => {
          const { order } = this.parser.options;
          const priorities = this.getOrderConfig(order) || order || [];
          // addresses special cases when sorting variables
          // give priority to variables
          // sorting variables based on same metrics solves issue
          // with replacing property declarations
          const endsEarlyOnVariablePrioritization = this.shouldEndEarly(p, c);
          if (endsEarlyOnVariablePrioritization !== null) {
            return endsEarlyOnVariablePrioritization;
          }

          if (priorities.indexOf(p.name) === -1) {
            return 1;
          }
          if (priorities.indexOf(c.name) === -1) {
            return -1;
          }
          return priorities.indexOf(p.name) - priorities.indexOf(c.name);
        });
      }

      const blockOffset = block.content[0].start.line - 1;
      const stagedBlock = block.toString().split('\n');

      collectedDecl.forEach(({ node }) => {
        const matchingIndex = matchingIndices.shift() || 0;
        const discoveredBlock = block.content[matchingIndex];

        const fromLine = node.start!.line - 1;
        const toLine = discoveredBlock.start.line - 1;

        producedOutput[toLine] = stagedBlock[fromLine - blockOffset];
      });
    });

    return parse(producedOutput.join('\n'), {
      syntax: this.ast.syntax,
    });
  }

  private getOrderConfig(order: SortOrderMethod) {
    if (this.orderPresets[order] !== undefined) {
      const filename = this.orderPresets[order];
      const orderConfig = sassLintHelpers.loadConfigFile(
        `property-sort-orders/${filename}`,
      );
      return orderConfig.order;
    }
    return null;
  }

  private shouldEndEarly(a: SortNode, b: SortNode): Nullable<number> {
    if (a.type === 'variable' && b.type !== 'variable') {
      return -1;
    } else if (a.type !== 'variable' && b.type === 'variable') {
      return 1;
    }
    return null;
  }

  private get orderPresets(): { [K in SortOrderMethod]: string } {
    return {
      recess: 'recess.yml',
      smacss: 'smacss.yml',
      concentric: 'concentric.yml',
    };
  }
}
