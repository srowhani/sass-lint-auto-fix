import { AbstractSyntaxTree, SlRule, TreeNode } from '@src/typings';
import BaseResolver from './base-resolver';

export default class HexNotation extends BaseResolver {
  private _letterRegex: RegExp;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._letterRegex = /[a-z]/i;
  }

  public fix(): AbstractSyntaxTree {
    const { ast } = this;

    ast.traverseByType('color', (colorNode: TreeNode) => {
      const content = colorNode.content.toString();

      if (content.match(this._letterRegex)) {
        if (this.shouldBeUppercase()) {
          colorNode.content = content.toUpperCase();
        } else if (this.shouldBeLowercase()) {
          colorNode.content = content.toLowerCase();
        }
      }
    });

    return ast;
  }

  private shouldBeUppercase(): boolean {
    return this.parser.options.style === 'uppercase';
  }

  private shouldBeLowercase(): boolean {
    return this.parser.options.style === 'lowercase';
  }
}
