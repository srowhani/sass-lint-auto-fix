import BaseResolver from './base-resolver';

import { AbstractSyntaxTree, SlRule, TreeNode } from './typings';

const slHelpers = require('sass-lint/lib/helpers');

export default class NoColorKeywords extends BaseResolver {
  private _cssColors: string[];
  private _cssColorRegex: RegExp;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._cssColors = slHelpers
      .loadConfigFile('../../data/literals.yml')
      .split(' ');
    this._cssColorRegex = new RegExp(`(${this._cssColors.join('|')})`);
  }

  public fix() {
    this.ast.traverseByType('value', (valueNode: TreeNode) => {
      valueNode.traverseByType(
        'ident',
        (identNode: TreeNode, _: any, identParent: TreeNode) => {
          if (!identParent.is('variable')) {
            const _index = this.colorKeywordIndex(identNode);
            if (_index > -1) {
              identNode.content = identNode.content.replace(
                this._cssColorRegex,
                `#${this._cssColors[1 + _index]}`,
              );
            }
          }
        },
      );
    });
    return this.ast;
  }

  private colorKeywordIndex(node: TreeNode): number {
    return this._cssColors.indexOf(node.content.toLowerCase());
  }
}
