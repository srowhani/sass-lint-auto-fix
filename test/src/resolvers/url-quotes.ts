import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('url-quotes', () => {
  const options = { 'url-quotes': 1 };

  describe('scss', () => {
    it('resolves', () => {
      const filename = 'test/sass/url-quotes.scss';

      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.scss, options);
      expect(preResolve.warningCount).toBe(1);
      expect(postResolve.warningCount).toBe(0);
    });
  });

  describe('sass', () => {
    it('resolves', () => {
      const filename = 'test/sass/url-quotes.sass';

      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.sass, options);
      expect(preResolve.warningCount).toBe(1);
      expect(postResolve.warningCount).toBe(0);
    });
  });
});
