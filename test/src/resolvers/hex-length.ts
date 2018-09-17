import { ValidFileType } from '@srctypes';
import resolve, { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('hex-length', () => {
  describe('scss', () => {
    describe('[style: short]', () => {
      const options = {
        'hex-length': 1,
      };
      it('resolves', () => {
        const filename = 'test/sass/hex-length.scss';
        const preResolve = lint(filename, options);
        const { ast } = resolveFirst(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });

    describe('[style: long]', () => {
      const options = {
        'hex-length': [
          1,
          {
            style: 'long',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/hex-length.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });

  describe('sass', () => {
    describe('[style: short]', () => {
      const options = {
        'hex-length': 1,
      };
      it('resolves', () => {
        const filename = 'test/sass/hex-length.sass';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });

    describe('[style: long]', () => {
      const options = {
        'hex-length': [
          1,
          {
            style: 'long',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/hex-length.sass';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
