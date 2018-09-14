type traversalCallback = (
  node: TreeNode,
  index?: number,
  parent?: TreeNode,
) => void;
type traversalCallbackWithDepth = (
  node: TreeNode,
  index?: number,
  parent?: TreeNode,
  depth?: number,
) => void;

export interface AbstractSyntaxTree {
  content: any;
  syntax: string;
  length: number;
  is(nodeType: string): boolean;
  get(index: number): AbstractSyntaxTree | null;
  traverse(callback: traversalCallbackWithDepth): void;
  traverseByType(nodeType: string, callback: traversalCallback): void;
  traverseByTypes(nodeTypes: string[], callback: traversalCallback): void;
  removeChild(index: number): TreeNode;
}

export interface TreeNode extends AbstractSyntaxTree {
  type: string;
  forEach(nodeType: string, callback: traversalCallback): void;
  first(nodeType?: string): TreeNode;
  last(nodeType?: string): TreeNode;
  toString(): string;
}

export interface SortNode {
  name: string;
  type: string;
  node: TreeNode;
}
