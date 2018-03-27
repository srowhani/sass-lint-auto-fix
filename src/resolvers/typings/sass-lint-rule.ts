import AbstractSyntaxTree from './abstract-syntax-tree';

export default interface SlRule {
  options: any;
  rule: SLRuleDescriptor;
}

export interface SLRuleDescriptor {
  name: string;
  detect(ast: AbstractSyntaxTree, rule: SlRule): any;
}
