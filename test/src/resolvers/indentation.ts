import resolve, { detect, lint } from '@test/helpers/resolve';

describe('indentation', () => {
  describe('scss', () => {
    const options = { indentation: 1 };
    it('resolves', done => {
      const filename = 'test/sass/indentation.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, options);
        const postResolve = detect(resolvedTree.toString(), 'scss', options);
        expect(preResolve.warningCount).toBe(14);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
