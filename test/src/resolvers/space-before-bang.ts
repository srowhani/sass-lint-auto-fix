import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('space-before-bang', () => {
  describe('scss', () => {
    describe('- include', () => {
      const options = { 'space-before-bang': 1 };

      it('resolves', () => {
        const filename = 'test/sass/space-before-bang.scss';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);
        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('- exclude', () => {
      const options = {
        'space-before-bang': [
          1,
          {
            include: false,
          },
        ],
      };

      it('resolves', () => {
        const filename = 'test/sass/space-before-bang.scss';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);
        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });

  describe('sass', () => {
    describe('- include', () => {
      const options = { 'space-before-bang': 1 };

      it('resolves', () => {
        const filename = 'test/sass/space-before-bang.sass';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);
        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('- exclude', () => {
      const options = {
        'space-before-bang': [
          1,
          {
            include: false,
          },
        ],
      };

      it('resolves', () => {
        const filename = 'test/sass/space-before-bang.sass';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
