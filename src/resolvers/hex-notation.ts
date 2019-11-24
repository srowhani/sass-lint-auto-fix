import { Node } from 'gonzales-pe-sl';
import { SlRule } from 'sass-lint';
import BaseResolver from './base-resolver';

export default class HexNotation extends BaseResolver {
  private _letterRegex: RegExp;

  constructor(ast: Node, parser: SlRule) {
    super(ast, parser);
    this._letterRegex = /[a-z]/i;
  }

  public fix(): Node {
    const { ast } = this;

    ast.traverseByType('color', (colorNode: Node) => {
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
