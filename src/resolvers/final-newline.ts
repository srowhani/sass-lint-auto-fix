import AbstractSyntaxTree from './typings/abstract-syntax-tree';

import BaseResolver from './base-resolver';
import SlRule from './typings/sass-lint-rule';

const gonzales = require('gonzales-pe-sl');

export default class FinalNewline extends BaseResolver {
  private _newlineDelimiter: string;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._newlineDelimiter = '\n';
  }

  public fix(): AbstractSyntaxTree {
    const { ast } = this;

    let newContent = ast.toString();

    if (this.shouldRemoveNewline()) {
      newContent = newContent.trimRight();
    } else if (this.shouldAddNewline(newContent)) {
      newContent += this._newlineDelimiter;
    }

    return gonzales.parse(newContent, {
      syntax: ast.syntax,
    });
  }

  private shouldAddNewline(raw: string): boolean {
    return this.parser.options.include && !raw.endsWith(this._newlineDelimiter);
  }

  private shouldRemoveNewline(): boolean {
    return !this.parser.options.include;
  }
}
