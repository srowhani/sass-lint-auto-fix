export default interface AbstractSyntaxTree {
  is(nodeType: string): boolean;
  traverse(
    callback: (node: TreeNode, index?: number, parent?: TreeNode) => void,
  ): void;
  traverseByType(
    nodeType: string,
    callback: (node: TreeNode, index?: number, parent?: TreeNode) => void,
  ): void;
  traverseByTypes(
    nodeTypes: string[],
    callback: (node: TreeNode, index?: number, parent?: TreeNode) => void,
  ): void;
  removeChild(index: number): TreeNode;
};

export interface TreeNode extends AbstractSyntaxTree {
  type: string;
  content: any;
  forEach(
    nodeType: string,
    callback: (node: TreeNode, index?: number, parent?: TreeNode) => void,
  ): void;
  first(nodeType?: string): TreeNode;
  toString(): string;
}

export interface SortNode {
  name: string;
  type: string;
  node: TreeNode;
}
