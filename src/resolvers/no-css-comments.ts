import { Node } from 'gonzales-pe-sl';
import BaseResolver from './base-resolver';

export default class NoCssComments extends BaseResolver {
  public fix() {
    this.ast.traverseByType(
      'multilineComment',
      (commentNode: Node, commentIndex: number, commentParent: Node) => {
        if (commentNode.content.charAt(0) !== '!') {
          commentParent.removeChild(commentIndex);
        }
      },
    );

    return this.ast;
  }
}
