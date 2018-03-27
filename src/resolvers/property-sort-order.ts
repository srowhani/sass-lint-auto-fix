import BaseResolver from './base-resolver';
import AbstractSyntaxTree, { TreeNode, SortNode } from './typings/abstract-syntax-tree';

const sassLintHelpers = require('sass-lint/lib/helpers');

export default class PropertySortOrder extends BaseResolver {
  fix() {
    this.ast.traverseByType('block', (block: TreeNode) => {
      const collectedDecl : SortNode[] = [];
      const matchingIndices : number[] = [];
      block.forEach('declaration', (declaration: TreeNode, index: number) => {
        const prop = declaration.first('property');

        const nodeContainingName : TreeNode = prop.first('ident') || prop.first('variable').first('ident');

        if (nodeContainingName) {
          const variable = prop.first('variable');

          // Avoid sorting variables, could potentially cause issues when
          // referencing variable before being declared, after sorting.
          if (!variable) {
            collectedDecl.push({
              name: nodeContainingName.toString(),
              node: declaration,
            });
            matchingIndices.push(index);
          }
        }
      });

      if (this.parser.options.order === 'alphabetical') {
        collectedDecl.sort((p, c) => p.name.localeCompare(c.name));
      } else {
        collectedDecl.sort((p, c) => {
          const { order } = this.parser.options;
          const priorities = this.getOrderConfig(order) || order || [];

          if (priorities.includes(p.name)) {
            return 1;
          } else if (priorities.includes(c.name)) {
            return -1;
          }

          return priorities.indexOf(p.name) - priorities.indexOf(c.name);
        });
      }
      collectedDecl.forEach(e => block.content[matchingIndices.shift()] = e.node);
    });
    return this.ast;
  }

  getOrderConfig(order: string) {
    if (this.orderPresets[order] !== undefined) {
      const filename = this.orderPresets[order];
      const orderConfig = sassLintHelpers.loadConfigFile(`property-sort-orders/${filename}`);
      return orderConfig.order;
    }
    return null;
  }

  get orderPresets(): any {
    return {
      recess: 'recess.yml',
      smacss: 'smacss.yml',
      concentric: 'concentric.yml',
    };
  }
}
