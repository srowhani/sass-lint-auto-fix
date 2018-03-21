import BaseResolver from './base';

export default class PropertySortOrder extends BaseResolver {
  fix () {
    return new Promise((resolve, reject) => {
      this.ast.traverseByType('block', function (block) {
        var res = [];
        var indexes = [];
        block.forEach('declaration', function (declaration, index) {
          const prop = declaration.first('property');
          const name = prop.first('ident') || prop.first('variable').first('ident');
          if (name) {
            res.push({
              name: name.toString(),
              node: declaration
            });
            indexes.push(index);
          }
        });
        if (parser.options.order === 'alphabetical') {
          res.sort(function (p, c) {
            return p.name.localeCompare(c.name);
          });
        }
        else {
          res.sort(function (p, c) {
            var order = parser.options.order;
            var priorities = getOrderConfig(order) || order || [];
            if (priorities.indexOf(p.name) === -1) {
              return 1;
            }
            if (priorities.indexOf(c.name) === -1) {
              return -1;
            }
            return priorities.indexOf(p.name) - priorities.indexOf(c.name);
          });
        }
        res.forEach(block => block.content[indexes.shift()] = block.node);
      });
    });
  }
};
