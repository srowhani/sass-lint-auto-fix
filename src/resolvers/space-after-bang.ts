import { Node } from 'gonzales-pe-sl';
import { SlRule } from 'sass-lint';
import BaseResolver from './base-resolver';

export default class SpaceAfterBang extends BaseResolver {
  private _noSpaceAfterBang: RegExp;
  private _spaceAfterBang: RegExp;

  constructor(ast: Node, parser: SlRule) {
    super(ast, parser);
    this._noSpaceAfterBang = /!\b/;
    this._spaceAfterBang = /!\s\b/;
  }

  public fix(): Node {
    const { ast } = this;

    ast.traverseByTypes(
      ['important', 'default', 'global', 'optional'],
      (node: Node) => {
        const value = node.content;

        if (this.shouldAddSpaceAfterBang(value)) {
          node.content = this.injectSpaceAfterBang(value);
        } else if (this.shouldRemoveSpaceAfterBang(value)) {
          node.content = this.removeSpaceAfterBang(value);
        }
      },
    );
    return ast;
  }

  private injectSpaceAfterBang(value: string): string {
    return value.replace(this._noSpaceAfterBang, '! ');
  }

  private shouldAddSpaceAfterBang(value: string): boolean {
    return (
      this.parser.options.include &&
      value.match(this._noSpaceAfterBang) !== null
    );
  }

  private removeSpaceAfterBang(value: string): string {
    return value.replace(this._spaceAfterBang, '!');
  }

  private shouldRemoveSpaceAfterBang(value: string): boolean {
    return (
      !this.parser.options.include && value.match(this._spaceAfterBang) !== null
    );
  }
}
