import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('no-trailing-zero', () => {
  const options = { 'no-trailing-zero': 1 };

  describe('scss', () => {
    it('resolves', () => {
      const filename = 'test/sass/no-trailing-zero.scss';
      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.scss, options);

      expect(preResolve.warningCount).toBe(8);
      expect(postResolve.warningCount).toBe(0);
    });
  });

  describe('sass', () => {
    it('resolves', () => {
      const filename = 'test/sass/no-trailing-zero.sass';
      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.sass, options);

      expect(preResolve.warningCount).toBe(8);
      expect(postResolve.warningCount).toBe(0);
    });
  });
});
