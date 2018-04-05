import resolve, { detect, lint } from '@test/helpers/resolve';

describe('no-trailing-zero', () => {
  const options = { 'no-trailing-zero': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/no-trailing-zero.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'no-trailing-zero': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'scss', {
          'no-trailing-zero': 1,
        });

        expect(preResolve.warningCount).toBe(8);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });

  describe('sass', () => {
    it('resolves', done => {
      const filename = 'test/sass/no-trailing-zero.sass';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'no-trailing-zero': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'sass', {
          'no-trailing-zero': 1,
        });

        expect(preResolve.warningCount).toBe(8);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
