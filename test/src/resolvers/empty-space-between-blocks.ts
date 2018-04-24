import resolve, { detect, lint } from '@test/helpers/resolve';

describe('empty-space-between-blocks', () => {
  describe('scss', () => {
    describe('[include: true, allow-single-line-rulesets: true]', () => {
      const options = { 'empty-line-between-blocks': 1 };
      it('resolves', done => {
        const filename = 'test/sass/empty-line-between-blocks.scss';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);

          expect(preResolve.warningCount).toBe(3);
          expect(postResolve.warningCount).toBe(1);
          done();
        });
      });
    });
  });
});
