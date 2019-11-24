import { Node } from 'gonzales-pe-sl';
import BaseResolver from './base-resolver';

export default class NoImportant extends BaseResolver {
  public fix() {
    this.ast.traverseByType(
      'important',
      (_: any, impIndex: number, impParent: Node) =>
        impParent.removeChild(impIndex),
    );
    return this.ast;
  }
}
