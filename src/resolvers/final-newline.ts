import { Node, parse } from 'gonzales-pe-sl';
import { SlRule } from 'sass-lint';
import BaseResolver from './base-resolver';

export default class FinalNewline extends BaseResolver {
  private _newlineDelimiter: string;

  constructor(ast: Node, parser: SlRule) {
    super(ast, parser);
    this._newlineDelimiter = '\n';
  }

  public fix(): Node {
    const { ast } = this;

    let newContent = ast.toString();

    if (this.shouldRemoveNewline()) {
      newContent = newContent.trimRight();
    } else if (this.shouldAddNewline(newContent)) {
      newContent += this._newlineDelimiter;
    }

    return parse(newContent, {
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
