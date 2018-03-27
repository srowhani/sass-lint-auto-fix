import BaseResolver from './base-resolver';

export default class NoCssComments extends BaseResolver {
  fix () {
    this.ast.traverseByType('multilineComment', (commentNode, commentIndex, commentParent) => {
      if (commentNode.content.charAt(0) !== '!')
        commentParent.removeChild(commentIndex);
    });

    return this.ast;
  }
}
