import resolve, { detect, lint } from '@test/helpers/resolve';

describe('hex-length', () => {
  const options = { 'hex-length': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/hex-length.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'hex-length': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'scss', {
          'hex-length': 1,
        });

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });

  describe('sass', () => {
    it('resolves', done => {
      const filename = 'test/sass/hex-length.sass';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'hex-length': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'sass', {
          'hex-length': 1,
        });

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
