const BaseResolver = require('./_base');
const sassLintHelpers = require('sass-lint/lib/helpers')

module.exports = class AttributeQuotes extends BaseResolver {

  constructor () {
    super(...arguments);
    this._quotePattern = /(\"|\')((?:\\.|[^"\\])*)(\"|\')/;
  }

  fix () {
    return new Promise(resolve => {
      this.traverse(this.ast, this.parser, (item) => {
        if (item.content[0].is('string') && !parser.options.include) {
          item.content[0].content = item.content[0].content.replace(this.quotePattern, '$2');
        } else if (item.content[0].is('ident') && parser.options.include) {
          item.content[0].content = item.content[0].content.replace(/(.*)/, '"$1"');
        }
      });
      resolve();
    })
  };

  traverse (ast, parser, callback) {
    ast.traverseByType('attributeValue', callback);
  };

  get quotePattern () {
    return this._quotePattern;
  }
}
