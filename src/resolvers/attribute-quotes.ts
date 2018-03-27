import BaseResolver from './base-resolver';

export default class AttributeQuotes extends BaseResolver {
  _quotePattern: RegExp;

  constructor (ast, rule) {
    super(ast, rule);
    this._quotePattern = /("|')((?:\\.|[^"\\])*)("|')/;
  }

  fix () {
    this.traverse(item => {
      const content = item.content[0].content;
      if (this.shouldRemoveQuotes(item)) {
        item.content[0].content = content.replace(this.quotePattern, '$2');
      } else if (this.shouldAddQuotes(item)) {
        item.content[0].content = content.replace(/(.*)/, '"$1"');
      }
    });
    return this.ast;
  }

  shouldRemoveQuotes (item) {
    return item.content[0].is('string') && !this.parser.options.include;
  }

  shouldAddQuotes (item) {
    return item.content[0].is('ident') && this.parser.options.include;
  }

  traverse (callback) {
    this.ast.traverseByType('attributeValue', callback);
  }

  get quotePattern () {
    return this._quotePattern;
  }
}
