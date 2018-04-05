import resolve, { detect, lint } from '@test/helpers/resolve';

describe('no-important', () => {
  const options = { 'no-important': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/no-important.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'no-important': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'scss', {
          'no-important': 1,
        });

        expect(preResolve.warningCount).toBe(1);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });

  describe('sass', () => {
    it('resolves', done => {
      const filename = 'test/sass/no-important.sass';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'no-important': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'sass', {
          'no-important': 1,
        });

        expect(preResolve.warningCount).toBe(1);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
