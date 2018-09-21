import { ValidFileType } from '@src/typings';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('attribute-quotes', () => {
  describe('scss', () => {
    describe('default', () => {
      const options = { 'attribute-quotes': 1 };
      it('resolves', () => {
        const filename = 'test/sass/attribute-quotes.scss';
        const preResolve = lint(filename, options);

        const { ast } = resolveFirst(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(5);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('exclude', () => {
      const options = {
        'attribute-quotes': [
          1,
          {
            include: false,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/attribute-quotes.scss';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(7);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });

  describe('sass', () => {
    describe('default', () => {
      const options = { 'attribute-quotes': 1 };
      it('resolves', () => {
        const filename = 'test/sass/attribute-quotes.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(5);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('exclude', () => {
      const options = {
        'attribute-quotes': [
          1,
          {
            include: false,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/attribute-quotes.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(7);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
