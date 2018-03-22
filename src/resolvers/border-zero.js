const BaseResolver = require('./_base');

module.exports = class BorderZero extends BaseResolver {
  constructor () {
    super(...arguments);
    this._borders = ['border', 'border-top', 'border-right', 'border-bottom', 'border-left'];
    this._allowedConventions = ['0', 'none'];
  }

  fix () {
    return new Promise(resolve => {
      this.traverse(this.ast, this.parser, node => node.content = this.parser.options.convention);
      resolve()
    })
  }

  traverse (ast, parser, callback) {
    ast.traverseByType('declaration', decl => {
      let isBorder = false;

      decl.traverse(item => {
        if (item.type === 'property') {
          item.traverse(child => {
            if (this.borders.indexOf(child.content) !== -1) {
              isBorder = true;
            }
          });
        }

        if (isBorder) {
          if (item.type === 'value') {
            const node = item.content[0];
            if (node.type === 'number' || node.type === 'ident') {
              if (node.content === '0' || node.content === 'none') {
                return callback(node);
              }
            }
          }
        }
        return item;
      });
    });
  }

  get borders () {
    return this._borders;
  }

  get allowedConventions () {
    return this._allowedConventions;
  }
}
