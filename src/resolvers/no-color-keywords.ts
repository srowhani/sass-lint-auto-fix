import BaseResolver from './base-resolver';

import { Node } from 'gonzales-pe-sl';
import { SlRule } from 'sass-lint';

const slHelpers = require('sass-lint/lib/helpers');

export default class NoColorKeywords extends BaseResolver {
  private _cssColors: string[];

  constructor(ast: Node, parser: SlRule) {
    super(ast, parser);
    this._cssColors = slHelpers
      .loadConfigFile('../../data/literals.yml')
      .split(' ');
  }

  public fix() {
    this.ast.traverseByType('value', (valueNode: Node) => {
      valueNode.traverseByType(
        'ident',
        (identNode: Node, index: number, identParent: Node) => {
          if (this.isValidParent(identParent)) {
            const colorIndex = this.colorKeywordIndex(identNode);

            if (colorIndex > -1) {
              const sibling = identParent.get(index + 1);
              if (sibling !== null) {
                // Sibling type arguments makes identNode the function name
                if (sibling.type === 'arguments') {
                  return;
                }
              }

              identNode.content = `#${this._cssColors[1 + colorIndex]}`;
            }
          }
        },
      );
    });
    return this.ast;
  }

  private colorKeywordIndex(node: Node): number {
    return this._cssColors.indexOf(node.content.toLowerCase());
  }

  private isValidParent(parentNode: Node): boolean {
    if (parentNode) {
      if (
        ['function', 'variable', 'customProperty'].some(prop =>
          parentNode.is(prop),
        )
      ) {
        return false;
      }
    }
    return true;
  }
}
