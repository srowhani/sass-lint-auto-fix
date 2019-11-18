import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';
const fs = require('fs');

describe('zero-unit', () => {
  describe('scss', () => {
    describe('[includes: true]', () => {
      const options = {
        'zero-unit': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/zero-unit.scss';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(fs.readFileSync(filename).toString()).toBe(ast.toString());

        expect(preResolve.warningCount).toBe(2);
        expect(postResolve.warningCount).toBe(2);
      });
    });
    describe('[includes: false]', () => {
      const options = { 'zero-unit': 1 };
      it('resolves', () => {
        const filename = 'test/sass/zero-unit.scss';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });

  describe('sass', () => {
    describe('[includes: true]', () => {
      const options = {
        'zero-unit': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/zero-unit.sass';
        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(fs.readFileSync(filename).toString()).toBe(ast.toString());

        expect(preResolve.warningCount).toBe(2);
        expect(postResolve.warningCount).toBe(2);
      });
    });
    describe('[includes: false]', () => {
      const options = { 'zero-unit': 1 };
      it('resolves', () => {
        const filename = 'test/sass/zero-unit.sass';

        const { ast } = resolveFirst(filename, options);

        const preResolve = lint(filename, options);
        const postResolve = detect(ast.toString(), ValidFileType.sass, options);

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
});
