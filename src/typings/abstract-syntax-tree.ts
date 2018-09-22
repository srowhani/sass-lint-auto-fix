import { Nullable } from './generics';

type traversalCallback = (
  node: TreeNode,
  index?: number,
  parent?: Nullable<TreeNode>,
) => void;

type traversalCallbackWithDepth = (
  node: TreeNode,
  index?: number,
  parent?: Nullable<TreeNode>,
  depth?: number,
) => void;

export interface AbstractSyntaxTree {
  content: any;
  syntax: string;
  length: number;
  is(nodeType: string): boolean;
  get(index: number): Nullable<AbstractSyntaxTree>;
  traverse(callback: traversalCallbackWithDepth): void;
  traverseByType(nodeType: string, callback: traversalCallback): void;
  traverseByTypes(nodeTypes: string[], callback: traversalCallback): void;
  removeChild(index: number): TreeNode;
}

export interface TreeNode extends AbstractSyntaxTree {
  type: string;
  forEach(nodeType: string, callback: traversalCallback): void;
  first(nodeType?: string): Nullable<TreeNode>;
  last(nodeType?: string): Nullable<TreeNode>;
  toString(): string;
}

export interface SortNode {
  name: string;
  type: string;
  node: TreeNode;
}
