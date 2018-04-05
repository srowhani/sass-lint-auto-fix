import resolve, { detect, lint } from '@test/helpers/resolve';

describe('space-after-bang', () => {
  const options = { 'space-after-bang': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/space-after-bang.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'space-after-bang': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'scss', {
          'space-after-bang': 1,
        });

        expect(preResolve.warningCount).toBe(7);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });

  describe('sass', () => {
    it('resolves', done => {
      const filename = 'test/sass/space-after-bang.sass';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'space-after-bang': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'sass', {
          'space-after-bang': 1,
        });

        expect(preResolve.warningCount).toBe(7);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
