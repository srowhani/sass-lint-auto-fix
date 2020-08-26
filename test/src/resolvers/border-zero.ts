import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('border-zero', () => {
  describe('scss', () => {
    describe('[convention: 0]', () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 0,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/border-zero.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
      
      it('preserves important', () => {
        const filename = 'test/sass/border-zero.scss';
        const { ast } = resolveFirst(filename, options);
        expect(ast.toString()).toContain('border: 0 !important;');
      });

      it('content not treated as falsey when set zero', () => {
        const filename = 'test/sass/border-zero.scss';
        const { ast } = resolveFirst(filename, options);
        expect(ast.toString()).not.toContain('border: ;');
      });
    });
    describe("[convention: '0']", () => {
      const options = { 'border-zero': 1 };
      it('resolves', () => {
        const filename = 'test/sass/border-zero.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe("[convention: 'none']", () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 'none',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/border-zero.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);

        const postResolve = detect(ast.toString(), ValidFileType.scss, options);
        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe("invalid convention [convention: 'zero']", () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 'zero',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/border-zero.scss';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(5);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });

  describe('sass', () => {
    describe('[convention: 0]', () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 0,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/border-zero.sass';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe("[convention: '0']", () => {
      const options = { 'border-zero': 1 };
      it('resolves', () => {
        const filename = 'test/sass/border-zero.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe("[convention: 'none']", () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 'none',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/border-zero.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
      });
    });
    describe("invalid convention [convention: 'zero']", () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 'zero',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/border-zero.sass';
        const { ast } = resolveFirst(filename, options);
        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(5);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
