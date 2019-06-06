import { AbstractSyntaxTree } from './abstract-syntax-tree';

export enum SlDetectSeverity {
  IGNORE = 0,
  WARNING = 1,
  SEVERE = 2,
}

export interface SlDetect {
  ruleId: string;
  line: number;
  column: number;
  message: string;
  severity: SlDetectSeverity;
}

export interface SlRule {
  options: any;
  rule: SLRuleDescriptor;
}

export interface SLRuleDescriptor {
  name: string;
  detect(ast: AbstractSyntaxTree, rule: SlRule): SlDetect[];
}
