import { TreeNode } from '@src/types';
import BaseResolver from './base-resolver';

export default class NoCssComments extends BaseResolver {
  public fix() {
    this.ast.traverseByType(
      'multilineComment',
      (
        commentNode: TreeNode,
        commentIndex: number,
        commentParent: TreeNode,
      ) => {
        if (commentNode.content.charAt(0) !== '!') {
          commentParent.removeChild(commentIndex);
        }
      },
    );

    return this.ast;
  }
}
