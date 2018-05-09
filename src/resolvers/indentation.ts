import BaseResolver from './base-resolver';
import AbstractSyntaxTree from './typings/abstract-syntax-tree';
import SlRule from './typings/sass-lint-rule';

const gonzales = require('gonzales-pe-sl');

export default class Indentation extends BaseResolver {
  private _depth: number;
  private _openingBraceRegex: RegExp;
  private _closingBraceRegex: RegExp;
  private _newLineDelimiter: string;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._depth = 0;
    this._openingBraceRegex = /{|\(/g;
    this._closingBraceRegex = /}|\)/g;
    this._newLineDelimiter = '\n';
  }

  public fix(): AbstractSyntaxTree {
    const { ast } = this;

    if (ast.syntax === 'sass') {
      return ast; // TODO: Support sass files
    }

    const rawContent = ast.toString();
    const resolvedContent = rawContent
      .split(this._newLineDelimiter)
      .map(line => this.visit(line))
      .join(this._newLineDelimiter);

    const resolvedAst = gonzales.parse(resolvedContent, {
      syntax: ast.syntax,
    });

    return resolvedAst;
  }

  private visit(line: string): string {
    if (this.isEmpty(line)) {
      return line;
    }
    const openMatches = line.match(this._openingBraceRegex) || [];
    const closeMatches = line.match(this._closingBraceRegex) || [];

    if (closeMatches.length > openMatches.length) {
      this._depth = Math.max(this._depth - 1, 0);
    }

    const resolvedLine = this.apply_indentation(line, this._depth);

    if (openMatches.length > closeMatches.length) {
      this._depth += 1;
    }

    return resolvedLine;
  }

  private apply_indentation(line: string, depth: number): string {
    return `${this._spacingUnit.repeat(
      depth * this.numSpaces,
    )}${line.trimLeft()}`;
  }

  private isEmpty(line: string): boolean {
    return line.trim().length === 0;
  }

  private tabEnabled(): boolean {
    return this.parser.options.size === 'tab';
  }

  private get _spacingUnit(): string {
    return this.tabEnabled() ? '\t' : ' ';
  }

  private get numSpaces(): number {
    return this.tabEnabled() ? 1 : this.parser.options.size;
  }
}
