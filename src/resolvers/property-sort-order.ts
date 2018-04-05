import BaseResolver from './base-resolver';
import { SortNode, TreeNode } from './typings/abstract-syntax-tree';

const sassLintHelpers = require('sass-lint/lib/helpers');

export default class PropertySortOrder extends BaseResolver {
  public fix() {
    console.log(this.parser.options);
    this.ast.traverseByType('block', (block: TreeNode) => {
      const collectedDecl: SortNode[] = [];
      const matchingIndices: number[] = [];
      block.forEach('declaration', (declaration: TreeNode, index: number) => {
        const prop = declaration.first('property');

        const nodeContainingName: TreeNode =
          prop.first('ident') || prop.first('variable').first('ident');

        if (nodeContainingName) {
          const variable = prop.first('variable');

          collectedDecl.push({
            name: nodeContainingName.toString(),
            node: declaration,
            type: variable !== null ? 'variable' : 'property',
          });
          matchingIndices.push(index);
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

      collectedDecl.forEach(
        e => (block.content[matchingIndices.shift() || 0] = e.node),
      );
    });
    return this.ast;
  }

  private getOrderConfig(order: string) {
    if (this.orderPresets[order] !== undefined) {
      const filename = this.orderPresets[order];
      const orderConfig = sassLintHelpers.loadConfigFile(
        `property-sort-orders/${filename}`,
      );
      return orderConfig.order;
    }
    return null;
  }

  private shouldEndEarly(a: SortNode, b: SortNode): number | null {
    if (a.type === 'variable' && b.type !== 'variable') {
      return -1;
    } else if (a.type !== 'variable' && b.type === 'variable') {
      return 1;
    }
    return null;
  }

  private get orderPresets(): any {
    return {
      recess: 'recess.yml',
      smacss: 'smacss.yml',
      concentric: 'concentric.yml',
    };
  }
}
