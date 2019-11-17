import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('space-after-colon', () => {
  describe('scss', () => {
    describe('[include: true]', () => {
      const options = { 'space-after-colon': 1 };
      it('resolves', () => {
        const filename = 'test/sass/space-after-colon.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
      });
    });

    describe('[include: false]', () => {
      const options = {
        'space-after-colon': [
          1,
          {
            include: false,
          },
        ],
      };

      it('resolves', () => {
        const filename = 'test/sass/space-after-colon.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);
        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });

  describe('sass', () => {
    describe('[include: true]', () => {
      const options = { 'space-after-colon': 1 };
      it('resolves', () => {
        const filename = 'test/sass/space-after-colon.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
      });
    });

    describe('[include: false]', () => {
      const options = {
        'space-after-colon': [
          1,
          {
            include: false,
          },
        ],
      };

      it('resolves', () => {
        const filename = 'test/sass/space-after-colon.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
