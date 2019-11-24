import { Node } from 'gonzales-pe-sl';

import { SlRule } from 'sass-lint';
import BaseResolver from './base-resolver';

export default class AttributeQuotes extends BaseResolver {
  private _quotePattern: RegExp;

  constructor(ast: Node, rule: SlRule) {
    super(ast, rule);
    this._quotePattern = /("|')((?:\\.|[^"\\])*)("|')/;
  }

  public fix() {
    return this.traverse(item => {
      const { content } = item.content[0];

      if (this.shouldRemoveQuotes(item)) {
        item.content[0].content = content.replace(this.quotePattern, '$2');
      } else if (this.shouldAddQuotes(item)) {
        item.content[0].content = content.replace(/(.*)/, `"$1"`);
      }
    });
  }

  private shouldRemoveQuotes(item: Node) {
    return item.content[0].is('string') && !this.parser.options.include;
  }

  private shouldAddQuotes(item: Node) {
    return item.content[0].is('ident') && this.parser.options.include;
  }

  private traverse(callback: (node: Node) => void): Node {
    this.ast.traverseByType('attributeValue', callback);
    return this.ast;
  }

  get quotePattern(): RegExp {
    return this._quotePattern;
  }
}
