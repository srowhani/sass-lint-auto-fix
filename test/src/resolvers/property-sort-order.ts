import { createLogger } from '@src/helpers';
import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

import { dedent } from '@test/helpers/utils';
const fs = require('fs');

describe('property-sort-order', () => {
  describe('- scss', () => {
    describe('- alphabetical', () => {
      const options = { 'property-sort-order': 1 };
      const filename = 'test/sass/property-sort-order.scss';

      it('resolves', () => {
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(24);
        expect(postResolve.warningCount).toBe(0);
      });

      it('preserves sass-lint disable-line properly', () => {
        const preResolve = fs.readFileSync(filename).toString();

        expect(preResolve).toContain(
          dedent(`
          .disable-line-test {
            display: block;
            border: none; // sass-lint:disable-line border-zero
          }
        `),
        );

        const { ast: postResolve } = resolveFirst(filename, options);

        expect(postResolve.toString()).toContain(
          dedent(`
          .disable-line-test {
            border: none; // sass-lint:disable-line border-zero
            display: block;
          }
        `),
        );
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

        expect(preResolve.warningCount).toBe(13);
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

        expect(preResolve.warningCount).toBe(13);
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

    it("doesn't throw on empty blocks", () => {
      const filename = 'test/sass/property-sort-order.scss';
      const options = { 'property-sort-order': 1 };

      const mockLogger = createLogger({ silentEnabled: true });
      mockLogger.warn = jest.fn();

      try {
        resolveFirst(filename, options, mockLogger);
      } finally {
        expect(mockLogger.warn).not.toHaveBeenCalledWith(
          'error',
          TypeError("Cannot read property 'start' of undefined"),
        );
      }
    });
  });

  describe('- sass', () => {
    describe('- alphabetical', () => {
      const filename = 'test/sass/property-sort-order.sass';
      const options = { 'property-sort-order': 1 };

      it('resolves', () => {
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);
        expect(preResolve.warningCount).toBe(20);
        expect(postResolve.warningCount).toBe(0);
      });

      it('preserves sass-lint disable-line properly', () => {
        const preResolve = fs.readFileSync(filename).toString();

        expect(preResolve).toContain(
          dedent(`
          .disable-line-test
            display: block
            border: none // sass-lint:disable-line border-zero
        `),
        );

        const { ast: postResolve } = resolveFirst(filename, options);

        expect(postResolve.toString()).toContain(
          dedent(`
          .disable-line-test
            border: none // sass-lint:disable-line border-zero
            display: block
        `),
        );
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

        expect(preResolve.warningCount).toBe(17);
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

        expect(preResolve.warningCount).toBe(17);
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
