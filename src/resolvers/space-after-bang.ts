import AbstractSyntaxTree, { TreeNode } from './typings/abstract-syntax-tree';

import BaseResolver from './base-resolver';
import SlRule from './typings/sass-lint-rule';

export default class SpaceAfterBang extends BaseResolver {
  private _noSpaceAfterBang: RegExp;
  private _spaceAfterBang: RegExp;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._noSpaceAfterBang = /!\b/;
    this._spaceAfterBang = /!\s\b/;
  }

  public fix(): AbstractSyntaxTree {
    const { ast } = this;

    ast.traverseByTypes(
      ['important', 'default', 'global', 'optional'],
      (node: TreeNode) => {
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
