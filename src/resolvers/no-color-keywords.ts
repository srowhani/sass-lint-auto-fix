import BaseResolver from './base-resolver';

import { AbstractSyntaxTree, SlRule, TreeNode } from '@src/typings';

const slHelpers = require('sass-lint/lib/helpers');

export default class NoColorKeywords extends BaseResolver {
  private _cssColors: string[];
  private _cssColorRegex: RegExp;
  private _invalidCharacters: RegExp;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._cssColors = slHelpers
      .loadConfigFile('../../data/literals.yml')
      .split(' ');
    this._cssColorRegex = new RegExp(`(${this._cssColors.join('|')})`);
    this._invalidCharacters = /(\$|\()/;
  }

  public fix() {
    this.ast.traverseByType('value', (valueNode: TreeNode) => {
      valueNode.traverseByType(
        'ident',
        (identNode: TreeNode, index: number, identParent: TreeNode) => {
          if (!identParent.is('variable')) {
            const colorIndex = this.colorKeywordIndex(identNode);
            if (colorIndex > -1) {
              const sibling = identParent.get(index + 1);
              if (sibling !== null) {
                // Sibling type arguments makes identNode the function name
                if (sibling.type === 'arguments') {
                  return;
                }
              }

              identNode.content = identNode.content.replace(
                this._cssColorRegex,
                `#${this._cssColors[1 + colorIndex]}`,
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

  private isContentValid(content: string): boolean {
    return !this._invalidCharacters.test(content);
  }
}
