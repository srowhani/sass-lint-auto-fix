import { detect, lint, resolveFirst } from '@test/helpers/resolve';
import { ValidFileType } from '@src/types';

describe('final-newline', () => {
  describe('scss', () => {
    describe('[include: true]', () => {
      const options = {
        'final-newline': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/final-newline-include.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(1);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[include: false]', () => {
      const options = {
        'final-newline': [
          1,
          {
            include: false,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/final-newline-none.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(1);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });

  describe('sass', () => {
    describe('[include: true]', () => {
      const options = {
        'final-newline': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/final-newline-include.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(1);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[include: false]', () => {
      const options = {
        'final-newline': [
          1,
          {
            include: false,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/final-newline-none.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(1);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
