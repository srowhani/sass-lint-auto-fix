import BaseResolver from './base-resolver';

const sassLintHelpers = require('sass-lint/lib/helpers')

export default class PropertySortOrder extends BaseResolver {
  fix () {
    this.ast.traverseByType('block', block => {
      const collectedBlocks = [];
      const indexes = [];
      block.forEach('declaration', (declaration, index) => {
        const prop = declaration.first('property');
        const name = prop.first('ident') || prop.first('variable').first('ident');

        if (name) {
          collectedBlocks.push({
            name: name.toString(),
            node: declaration
          });
          indexes.push(index);
        }
      });
      if (this.parser.options.order === 'alphabetical') {
        collectedBlocks.sort((p, c) => p.name.localeCompare(c.name));
      } else {
        collectedBlocks.sort((p, c) => {
          const order = this.parser.options.order;
          const priorities = this.getOrderConfig(order) || order || [];

          if (priorities.includes(p.name)) {
            return 1;
          } else if (priorities.includes(c.name)) {
            return -1;
          }

          return priorities.indexOf(p.name) - priorities.indexOf(c.name);
        });
      }
      collectedBlocks.forEach(e => block.content[indexes.shift()] = e.node);
    });
    return this.ast;
  }

  getOrderConfig(order) {
    if (typeof order === 'string') {
      if (this.orderPresets[order] !== undefined) {
        const filename = this.orderPresets[order];
        const orderConfig = sassLintHelpers.loadConfigFile('property-sort-orders/' + filename);
        return orderConfig.order;
      }
    }
    return false;
  }

  get orderPresets() {
    return {
      recess: 'recess.yml',
      smacss: 'smacss.yml',
      concentric: 'concentric.yml'
    }
  }
};
