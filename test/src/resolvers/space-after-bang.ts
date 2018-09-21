import { ValidFileType } from '@src/typings';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('space-after-bang', () => {
  describe('scss', () => {
    describe('[include: false]', () => {
      const options = {
        'space-after-bang': [
          1,
          {
            include: false,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/space-after-bang.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(7);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[include: true]', () => {
      const options = {
        'space-after-bang': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/space-after-bang.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(7);
        // TODO: sass-lint reports errors on include space
        expect(postResolve.warningCount).toBe(14);
      });
    });
  });

  describe('sass', () => {
    describe('[include: false]', () => {
      const options = { 'space-after-bang': 1 };
      it('resolves', () => {
        const filename = 'test/sass/space-after-bang.sass';

        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(7);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[include: true]', () => {
      const options = {
        'space-after-bang': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/space-after-bang.sass';

        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(7);
        // TODO: sass-lint reports errors on include space
        expect(postResolve.warningCount).toBe(14);
      });
    });
  });
});
