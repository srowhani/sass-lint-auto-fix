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
  get(index: number): Nullable<TreeNode>;
  traverse(callback: traversalCallbackWithDepth): void;
  traverseByType(nodeType: string, callback: traversalCallback): void;
  traverseByTypes(nodeTypes: string[], callback: traversalCallback): void;
  removeChild(index: number): TreeNode;
  toString(): string;
}

export enum NodeType {
  arguments = 'arguments',
  atkeyword = 'atkeyword',
  atrule = 'atrule',
  attributeFlags = 'attributeFlags',
  attributeMatch = 'attributeMatch',
  attributeName = 'attributeName',
  attributeSelector = 'attributeSelector',
  attributeValue = 'attributeValue',
  block = 'block',
  brackets = 'brackets',
  class = 'class',
  color = 'color',
  combinator = 'combinator',
  condition = 'condition',
  conditionalStatement = 'conditionalStatement',
  declaration = 'declaration',
  declarationDelimiter = 'declarationDelimiter',
  default = 'default',
  delimiter = 'delimiter',
  dimension = 'dimension',
  escapedString = 'escapedString',
  extend = 'extend',
  expression = 'expression',
  function = 'function',
  global = 'global',
  id = 'id',
  ident = 'ident',
  important = 'important',
  include = 'include',
  interpolatedVariable = 'interpolatedVariable',
  interpolation = 'interpolation',
  keyframesSelector = 'keyframesSelector',
  loop = 'loop',
  mixin = 'mixin',
  multilineComment = 'multilineComment',
  namePrefix = 'namePrefix',
  namespacePrefix = 'namespacePrefix',
  namespaceSeparator = 'namespaceSeparator',
  number = 'number',
  operator = 'operator',
  parentheses = 'parentheses',
  parentSelector = 'parentSelector',
  parentSelectorExtension = 'parentSelectorExtension',
  percentage = 'percentage',
  placeholder = 'placeholder',
  progid = 'progid',
  property = 'property',
  propertyDelimiter = 'propertyDelimiter',
  pseudoClass = 'pseudoClass',
  pseudoElement = 'pseudoElement',
  raw = 'raw',
  ruleset = 'ruleset',
  space = 'space',
  selector = 'selector',
  singlelineComment = 'singlelineComment',
  string = 'string',
  stylesheet = 'stylesheet',
  typeSelector = 'typeSelector',
  unicodeRange = 'unicodeRange',
  universalSelector = 'universalSelector',
  urange = 'urange',
  uri = 'uri',
  value = 'value',
  variable = 'variable',
  variablesList = 'variablesList',
}

export interface NodePosition {
  line: number;
  column: number;
}

export interface TreeNode extends AbstractSyntaxTree {
  type: NodeType;
  start: NodePosition;
  end: NodePosition;
  forEach(nodeType: string, callback: traversalCallback): void;
  first(nodeType?: string): Nullable<TreeNode>;
  last(nodeType?: string): Nullable<TreeNode>;
}

export interface SortNode {
  name: string;
  type: string;
  node: TreeNode;
}
