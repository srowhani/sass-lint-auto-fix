import resolve, { detect, lint } from '@test/helpers/resolve';

describe('no-css-comments', () => {
  const options = { 'no-css-comments': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/no-css-comments.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'no-css-comments': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'scss', {
          'no-css-comments': 1,
        });

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });

  describe('sass', () => {
    it('resolves', done => {
      const filename = 'test/sass/no-css-comments.sass';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'no-css-comments': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'sass', {
          'no-css-comments': 1,
        });

        expect(preResolve.warningCount).toBe(4);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
