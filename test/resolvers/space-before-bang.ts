import resolve, { detect, lint } from '@test/helpers/resolve';

describe('space-before-bang', () => {
  const options = { 'space-before-bang': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/space-before-bang.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'space-before-bang': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'scss', {
          'space-before-bang': 1,
        });

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });

  describe('sass', () => {
    it('resolves', done => {
      const filename = 'test/sass/space-before-bang.sass';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'space-before-bang': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'sass', {
          'space-before-bang': 1,
        });

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
