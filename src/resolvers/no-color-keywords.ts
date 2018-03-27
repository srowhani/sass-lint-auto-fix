import BaseResolver from './base-resolver';
import AbstractSyntaxTree, { TreeNode } from './typings/abstract-syntax-tree';
import SlRule from './typings/sass-lint-rule';

const slHelpers = require('sass-lint/lib/helpers');

export default class NoColorKeywords extends BaseResolver {
  _cssColors: string[];
  _cssColorRegex: RegExp;

  constructor(ast: AbstractSyntaxTree, parser: SlRule) {
    super(ast, parser);
    this._cssColors = slHelpers.loadConfigFile('../../data/literals.yml').split(' ');
    this._cssColorRegex = new RegExp(`(${this._cssColors.join('|')})`);
  }

  fix() {
    this.ast.traverseByType('value', (valueNode: TreeNode) => {
      valueNode.traverseByType('ident', (identNode: TreeNode, identIndex: number, identParent: TreeNode) => {
        if (!identParent.is('variable')) {
          const _index = this.colorKeywordIndex(identNode);
          if (_index > -1) {
            identNode.content = identNode.content.replace(
              this._cssColorRegex,
              `#${this._cssColors[1 + _index]}`,
            );
          }
        }
      });
    });
    return this.ast;
  }

  colorKeywordIndex(node: TreeNode) : number {
    return this._cssColors.indexOf(node.content.toLowerCase());
  }
}
