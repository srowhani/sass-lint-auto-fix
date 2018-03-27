export interface AbstractSyntaxTree {
  traverseByType(nodeType: string, callback: Function) : void;
}
