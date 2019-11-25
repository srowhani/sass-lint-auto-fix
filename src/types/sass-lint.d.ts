declare module 'sass-lint' {
  import { Nullable, ValidFileType } from '@src/types';
  import { Node } from 'gonzales-pe-sl';

  export interface SlRule {
    options: any;
    rule: SLRuleDescriptor;
  }

  export interface SLRuleDescriptor {
    name: string;
    detect(ast: Node, rule: SlRule): SlDetect[];
  }

  enum SlDetectSeverity {
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

  export interface Ruleset {
    [ruleName: string]: number | { [ruleOption: string]: any };
  }

  export interface LintOpts {
    options: {
      formatter?: string;
      'merge-default-rules'?: boolean;
      'cache-config'?: boolean;
    };
    files: {
      include: string | string[];
    };
    rules: Ruleset;
  }

  export interface LintResult {
    filePath: string;
    warningCount: number;
    errorCount: number;
    messages: SlDetect;
  }

  export function lintText(
    file: {
      text: string | Buffer;
      format: ValidFileType;
      filename: string | null;
    },
    opts: LintOpts,
    configPath?: string,
  ): LintResult;
}
