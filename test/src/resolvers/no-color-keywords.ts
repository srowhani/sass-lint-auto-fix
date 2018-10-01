import { ValidFileType } from '@src/typings';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('no-color-keywords', () => {
  const options = { 'no-color-keywords': 1 };

  describe('scss', () => {
    const filename = 'test/sass/no-color-keywords.scss';

    it('resolves', () => {
      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.scss, options);
      expect(preResolve.warningCount).toBe(8);
      expect(postResolve.warningCount).toBe(0);
    });

    it('doesnt modify color functions', () => {
      const { ast } = resolveFirst(filename, options);
      const content = ast.toString().replace(/\s/g, '');
      expect(content).toContain(
        `$colors: (
        'red': red($color),
        'green': green($color),
        'blue': blue($color)
      );`.replace(/\s/g, ''),
      );
    });
  });

  describe('sass', () => {
    const filename = 'test/sass/no-color-keywords.sass';

    it('resolves', () => {
      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.sass, options);
      expect(preResolve.warningCount).toBe(8);
      expect(postResolve.warningCount).toBe(0);
    });
  });
});
