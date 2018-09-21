import { ValidFileType } from '@src/typings';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('space-before-colon', () => {
  describe('scss', () => {
    describe('[include: false]', () => {
      const options = { 'space-before-colon': 1 };

      it('resolves', () => {
        const filename = 'test/sass/space-before-colon.scss';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[include: true]', () => {
      const options = {
        'space-before-colon': [
          1,
          {
            include: true,
          },
        ],
      };

      it('resolves', () => {
        const filename = 'test/sass/space-before-colon.scss';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });

  describe('sass', () => {
    describe('[include: false]', () => {
      const options = { 'space-before-colon': 1 };

      it('resolves', () => {
        const filename = 'test/sass/space-before-colon.sass';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[include: true]', () => {
      const options = {
        'space-before-colon': [
          1,
          {
            include: true,
          },
        ],
      };

      it('resolves', () => {
        const filename = 'test/sass/space-before-colon.sass';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
