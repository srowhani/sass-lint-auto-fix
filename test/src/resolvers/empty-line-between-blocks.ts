import { ValidFileType } from '@src/types';
import { detect, lint, resolveFirst } from '@test/helpers/resolve';

const fs = require('fs');

describe('empty-line-between-blocks', () => {
  describe('scss', () => {
    describe('[include: true, allow-single-line-rulesets: true]', () => {
      const options = {
        'empty-line-between-blocks': [
          1,
          { 'allow-single-line-rulesets': true },
        ],
      };
      it('resolves', () => {
        const filename = 'test/sass/empty-line-between-blocks.scss';
        const preResolve = lint(filename, options);
        const { ast } = resolveFirst(filename, options);

        const postResolve = detect(ast.toString(), ValidFileType.scss, options);

        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
      });
    });
  });
  describe('sass', () => {
    const options = { 'empty-line-between-blocks': 1 };

    it('does not modify', () => {
      const filename = 'test/sass/empty-line-between-blocks.sass';
      const { ast } = resolveFirst(filename, options);

      expect(fs.readFileSync(filename).toString()).toBe(ast.toString());
    });
  });
});
