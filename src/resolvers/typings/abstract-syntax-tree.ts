export default interface AbstractSyntaxTree {
  is(nodeType: string): boolean;
  traverse(callback: Function): void;
  traverseByType(nodeType: string, callback: Function) : void;
  traverseByTypes(nodeTypes: string[], callback: Function) : void;
  removeChild(index: number) : TreeNode;
}

export interface TreeNode extends AbstractSyntaxTree {
  type: string;
  content: any;
  forEach(nodeType: string, callback: Function) : void;
  first(nodeType?: string): TreeNode;
  toString() : string;
}

export interface SortNode {
  name: string,
  type: string,
  node: TreeNode,
}
