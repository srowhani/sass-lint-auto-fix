import BaseResolver from './base-resolver';
const slHelpers = require('sass-lint/lib/helpers');
const yaml = require('js-yaml');

export default class NoColorKeywords extends BaseResolver {
  _cssColors: Array<string>;
  _cssColorRegex: RegExp;

  constructor(ast, parser) {
    super(ast, parser);
    this._cssColors = slHelpers.loadConfigFile('../../data/literals.yml').split(' ');
    this._cssColorRegex = new RegExp(`(${this._cssColors.join('|')})`);
  }

  fix () {
    this.ast.traverseByType('value', valueNodes => {
      valueNodes.traverseByTypes('ident', (identNode, identIndex, identParent) => {
        if (!identParent.is('variable')) {
          const _index = this.colorKeywordIndex(identNode);
          if (_index > -1) {
            identNode.content = identNode.content.replace(
              this._cssColorRegex,
              `#${this._cssColors[1 + _index]}`
            )
          }
        }
      });
    });
    return this.ast;
  };

  colorKeywordIndex (node) : number {
    return this._cssColors.indexOf(node.content.toLowerCase());
  }
}
