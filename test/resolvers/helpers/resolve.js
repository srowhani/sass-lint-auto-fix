import SlAutoFix from '../../../src/sass-lint-fix';

export default function (options = {}, onResolve = (filename, rule, ast) => {}) {
  const slaf = new SlAutoFix(options);
  slaf.run({
    onResolve
  });
}
