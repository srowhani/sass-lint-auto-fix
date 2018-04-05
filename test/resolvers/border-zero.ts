import resolve, { detect, lint } from '@test/helpers/resolve';

describe('border-zero', () => {
  const options = { 'border-zero': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/border-zero.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'border-zero': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'scss', {
          'border-zero': 1,
        });

        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });

  describe('sass', () => {
    it('resolves', done => {
      const filename = 'test/sass/border-zero.sass';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'border-zero': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'sass', {
          'border-zero': 1,
        });

        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
