import BaseResolver from './base-resolver';

export default class NoImportant extends BaseResolver {
  fix () {
    this.ast.traverseByType('important', (importantNode, importantIndex, importantParent) =>
      importantParent.removeChild(importantIndex);
    );

    return this.ast;
  }
}
