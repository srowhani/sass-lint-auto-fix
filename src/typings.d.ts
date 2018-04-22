export interface SlfParserOptions {
  include?: string;
  ignore?: string[];
  syntax?: SlfParserSyntaxOptions;
  resolvers?: any;
}

interface SlfParserSyntaxOptions {
  include: string[];
}
