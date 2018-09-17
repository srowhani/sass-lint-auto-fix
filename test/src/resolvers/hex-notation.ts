import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('hex-notation', () => {
  describe('scss', () => {
    describe('[style=default]', () => {
      const options = { 'hex-notation': 1 };
      it('resolves', () => {
        const filename = 'test/sass/hex-notation.scss';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(6);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[style=lowercase]', () => {
      const options = {
        'hex-notation': [
          1,
          {
            style: 'lowercase',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/hex-notation.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(6);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[style=uppercase]', () => {
      const options = {
        'hex-notation': [
          1,
          {
            style: 'uppercase',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/hex-notation.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(7);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
  describe('sass', () => {
    describe('[style=default]', () => {
      const options = { 'hex-notation': 1 };
      it('resolves', () => {
        const filename = 'test/sass/hex-notation.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(6);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[style=lowercase]', () => {
      const options = {
        'hex-notation': [
          1,
          {
            style: 'lowercase',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/hex-notation.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(6);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe('[style=uppercase]', () => {
      const options = {
        'hex-notation': [
          1,
          {
            style: 'uppercase',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/hex-notation.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(7);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
