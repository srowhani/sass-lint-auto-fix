import BaseResolver from './base-resolver';
import AbstractSyntaxTree from './typings/abstract-syntax-tree';
import SlRule from './typings/sass-lint-rule';

const gonzales = require('gonzales-pe-sl');

export default class EmptyLineBetweenBlocks extends BaseResolver {
  private _scssEmptyLineRegex: RegExp;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._scssEmptyLineRegex = /}\n(.*\S\s.*){/gm;
  }

  public fix(): AbstractSyntaxTree {
    const { ast } = this;
    // TODO: Implement `fix` for sass
    if (ast.syntax === 'scss') {
      if (this.shouldInjectNewline()) {
        const content = ast.toString();
        const newContent = content.replace(
          this._scssEmptyLineRegex,
          '}\n\n$1{',
        );

        const newTree = gonzales.parse(newContent, {
          syntax: 'scss',
        });

        return newTree;
      }
    }
    return ast;
  }

  private shouldInjectNewline(): boolean {
    return (
      this.parser.options.include === true &&
      this.parser.options['allow-single-line-rulesets'] === true
    );
  }
}
