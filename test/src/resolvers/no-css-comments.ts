import { ValidFileType } from '@src/typings';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('no-css-comments', () => {
  const options = { 'no-css-comments': 1 };

  describe('scss', () => {
    it('resolves', () => {
      const filename = 'test/sass/no-css-comments.scss';
      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.scss, options);

      expect(preResolve.warningCount).toBe(4);
      expect(postResolve.warningCount).toBe(0);
    });
  });

  describe('sass', () => {
    it('resolves', () => {
      const filename = 'test/sass/no-css-comments.sass';
      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.sass, options);

      expect(preResolve.warningCount).toBe(4);
      expect(postResolve.warningCount).toBe(0);
    });
  });
});
