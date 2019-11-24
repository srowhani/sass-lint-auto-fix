import { Node } from 'gonzales-pe-sl';
import { SlRule } from 'sass-lint';
import BaseResolver from './base-resolver';

export default class UrlQuotes extends BaseResolver {
  private _variableRegex: RegExp;

  constructor(ast: Node, parser: SlRule) {
    super(ast, parser);
    this._variableRegex = /^[\$]/;
  }

  public fix(): Node {
    const { ast } = this;

    ast.traverseByType('uri', (node: Node) => {
      node.traverse(item => {
        if (item.is('raw')) {
          if (!this.isVariable(item)) {
            item.content = `'${item.content}'`;
          }
        }
      });
    });

    return ast;
  }

  private isVariable(item: Node): boolean {
    return item.content.match(this._variableRegex);
  }
}
