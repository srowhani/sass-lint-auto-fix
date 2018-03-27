import BaseResolver from './base-resolver';
import { TreeNode } from './typings/abstract-syntax-tree';


export default class NoImportant extends BaseResolver {
  fix() {
    this.ast.traverseByType(
      'important',
      (impNode: TreeNode, impIndex: number, impParent: TreeNode) =>
        impParent.removeChild(impIndex),
    );
    return this.ast;
  }
}
