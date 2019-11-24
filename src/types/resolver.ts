import { Node } from 'gonzales-pe-sl';
import { SlDetect, SlRule } from 'sass-lint';

export type ResolverConstructable = new (ast: Node, parser: SlRule) => Resolver;

export interface Resolver {
  ast: Node;
  parser: SlRule;
  fix(detects: SlDetect[]): Node;
}
