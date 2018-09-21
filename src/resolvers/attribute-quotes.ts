import { AbstractSyntaxTree, SlRule, TreeNode } from '@src/typings';

import BaseResolver from './base-resolver';

export default class AttributeQuotes extends BaseResolver {
  private _quotePattern: RegExp;

  constructor(ast: AbstractSyntaxTree, rule: SlRule) {
    super(ast, rule);
    this._quotePattern = /("|')((?:\\.|[^"\\])*)("|')/;
  }

  public fix() {
    return this.traverse((item: TreeNode) => {
      const { content } = item.content[0];

      if (this.shouldRemoveQuotes(item)) {
        item.content[0].content = content.replace(this.quotePattern, '$2');
      } else if (this.shouldAddQuotes(item)) {
        item.content[0].content = content.replace(/(.*)/, `"$1"`);
      }
    });
  }

  private shouldRemoveQuotes(item: TreeNode) {
    return item.content[0].is('string') && !this.parser.options.include;
  }

  private shouldAddQuotes(item: TreeNode) {
    return item.content[0].is('ident') && this.parser.options.include;
  }

  private traverse(callback: (node: TreeNode) => void): AbstractSyntaxTree {
    this.ast.traverseByType('attributeValue', callback);
    return this.ast;
  }

  get quotePattern(): RegExp {
    return this._quotePattern;
  }
}
