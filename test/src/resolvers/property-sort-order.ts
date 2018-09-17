import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

describe('property-sort-order', () => {
  describe('- scss', () => {
    describe('- alphabetical', () => {
      const options = { 'property-sort-order': 1 };
      it('resolves', () => {
        const filename = 'test/sass/property-sort-order.scss';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(19);
        expect(postResolve.warningCount).toBe(0);
      });
    });

    describe('- smacss', () => {
      const options = {
        'property-sort-order': [
          1,
          {
            order: 'smacss',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/property-sort-order.scss';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(12);
        expect(postResolve.warningCount).toBe(0);
      });
    });

    describe('- recess', () => {
      const options = {
        'property-sort-order': [
          1,
          {
            order: 'recess',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/property-sort-order.scss';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(12);
        expect(postResolve.warningCount).toBe(0);
      });
    });

    describe('- custom', () => {
      const options = {
        'property-sort-order': [
          1,
          {
            order: ['height', 'width', 'display', 'color'],
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/property-sort-order.scss';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(8);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });

  describe('- sass', () => {
    describe('- alphabetical', () => {
      const options = { 'property-sort-order': 1 };
      it('resolves', () => {
        const filename = 'test/sass/property-sort-order.sass';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);
        expect(preResolve.warningCount).toBe(15);
        expect(postResolve.warningCount).toBe(0);
      });
    });

    describe('- smacss', () => {
      const options = {
        'property-sort-order': [
          1,
          {
            order: 'smacss',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/property-sort-order.sass';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(16);
        expect(postResolve.warningCount).toBe(0);
      });
    });

    describe('- recess', () => {
      const options = {
        'property-sort-order': [
          1,
          {
            order: 'recess',
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/property-sort-order.sass';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(16);
        expect(postResolve.warningCount).toBe(0);
      });
    });

    describe('- custom', () => {
      const options = {
        'property-sort-order': [
          1,
          {
            order: ['height', 'width', 'display', 'color'],
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/property-sort-order.sass';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(10);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
