declare module 'gonzales-pe-sl' {
  import { Nullable } from '@src/types';

  type traversalCallback = (
    node: Node,
    index?: number,
    parent?: Nullable<Node>,
  ) => void;

  type traversalCallbackWithDepth = (
    node: Node,
    index?: number,
    parent?: Nullable<Node>,
    depth?: number,
  ) => void;

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

  export interface NodeOpts {
    type: keyof typeof NodeType;
    content: any;
    syntax: string;
    start?: NodePosition;
    end?: NodePosition;
  }

  export interface Node extends NodeOpts {
    length: number;
    forEach(nodeType: string, callback: traversalCallback): void;
    first(nodeType?: string): Nullable<Node>;
    last(nodeType?: string): Nullable<Node>;
    is(nodeType: string): boolean;
    get(index: number): Nullable<Node>;
    traverse(callback: traversalCallbackWithDepth): void;
    traverseByType(nodeType: string, callback: traversalCallback): void;
    traverseByTypes(nodeTypes: string[], callback: traversalCallback): void;
    removeChild(index: number): Node;
    toString(): string;
  }

  export interface SortNode {
    name: string;
    type: string;
    node: Node;
  }

  export function createNode(opts: NodeOpts): Node;
  export function parse(
    css: string,
    opts: {
      syntax?: string;
      context?: string;
      tabSize?: number;
    },
  ): Node;
}
