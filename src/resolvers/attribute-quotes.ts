import BaseResolver from './base-resolver';
import AbstractSyntaxTree, { TreeNode } from './typings/abstract-syntax-tree';
import SlRule from './typings/sass-lint-rule';

export default class AttributeQuotes extends BaseResolver {
  _quotePattern: RegExp;

  constructor(ast: AbstractSyntaxTree, rule: SlRule) {
    super(ast, rule);
    this._quotePattern = /("|')((?:\\.|[^"\\])*)("|')/;
  }

  fix() {
    return this.traverse((item: TreeNode) => {
      const { content } = item.content[0];

      if (this.shouldRemoveQuotes(item)) {
        item.content[0].content = content.replace(this.quotePattern, '$2');
      } else if (this.shouldAddQuotes(item)) {
        item.content[0].content = content.replace(/(.*)/, '"$1"');
      }
    });
  }

  shouldRemoveQuotes(item: TreeNode) {
    return item.content[0].is('string') && !this.parser.options.include;
  }

  shouldAddQuotes(item: TreeNode) {
    return item.content[0].is('ident') && this.parser.options.include;
  }

  traverse(callback: Function) : AbstractSyntaxTree {
    this.ast.traverseByType('attributeValue', callback);
    return this.ast;
  }

  get quotePattern() : RegExp {
    return this._quotePattern;
  }
}
