import BaseResolver from './base-resolver';
import { AbstractSyntaxTree, SlRule } from './typings';

const gonzales = require('gonzales-pe-sl');

export default class Indentation extends BaseResolver {
  private _depth: number;
  private _openingBraceRegex: RegExp;
  private _closingBraceRegex: RegExp;
  private _atQueryDelimiter: string;
  private _newLineDelimiter: string;
  private _commaDelimiter: string;
  private _bumpNextLine: boolean;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._depth = 0;
    this._openingBraceRegex = /{|\(/g;
    this._closingBraceRegex = /}|\)/g;
    this._atQueryDelimiter = '@';
    this._newLineDelimiter = '\n';
    this._commaDelimiter = ',';
    this._bumpNextLine = false;
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

    let appliedDepth = this._depth;

    if (this.shouldBumpNextLine(line)) {
      appliedDepth += 1;
    }

    const resolvedLine = this.apply_indentation(line, appliedDepth);

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

  private shouldBumpNextLine(line: string): boolean {
    if (this._bumpNextLine) {
      const cachedState = this._bumpNextLine;

      this._bumpNextLine = this.blockStillOpen(line);
      return cachedState;
    } else {
      const cachedState = this._bumpNextLine;

      this._bumpNextLine = this.startsWithAt(line) && this.endsWithComma(line);
      return cachedState;
    }
  }

  private blockStillOpen(line: string) {
    return !line.trimRight().endsWith('}');
  }

  private startsWithAt(line: string) {
    return line.trimLeft().startsWith(this._atQueryDelimiter);
  }

  private endsWithComma(line: string): boolean {
    return line.trimRight().endsWith(this._commaDelimiter);
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
