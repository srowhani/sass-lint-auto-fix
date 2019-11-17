import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('indentation', () => {
  describe('scss', () => {
    const options = { indentation: 1 };
    it('resolves', () => {
      const filename = 'test/sass/indentation.scss';
      const { ast } = resolveFirst(filename, options);
      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.scss, options);
      expect(preResolve.warningCount).toBe(14);
      expect(postResolve.warningCount).toBe(0);
    });
  });
});
