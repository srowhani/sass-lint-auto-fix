import { ValidFileType } from '@src/typings';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('space-between-parens', () => {
  describe('scss', () => {
    describe('[include: false]', () => {
      const options = { 'space-between-parens': 1 };

      it('resolves', () => {
        const filename = 'test/sass/space-between-parens.scss';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[include: true]', () => {
      const options = {
        'space-between-parens': [
          1,
          {
            include: true,
          },
        ],
      };

      it('resolves', () => {
        const filename = 'test/sass/space-between-parens.scss';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(6);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });

  describe('sass', () => {
    describe('[include: false]', () => {
      const options = { 'space-between-parens': 1 };

      it('resolves', () => {
        const filename = 'test/sass/space-between-parens.sass';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[include: true]', () => {
      const options = {
        'space-between-parens': [
          1,
          {
            include: true,
          },
        ],
      };

      it('resolves', () => {
        const filename = 'test/sass/space-between-parens.sass';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(6);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
