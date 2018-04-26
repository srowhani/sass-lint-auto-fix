import resolve, { detect, lint } from '@test/helpers/resolve';

describe('url-quotes', () => {
  const options = { 'url-quotes': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/url-quotes.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, options);
        const postResolve = detect(resolvedTree.toString(), 'scss', options);
        expect(preResolve.warningCount).toBe(1);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });

  describe('sass', () => {
    it('resolves', done => {
      const filename = 'test/sass/url-quotes.sass';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, options);
        const postResolve = detect(resolvedTree.toString(), 'sass', options);
        expect(preResolve.warningCount).toBe(1);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
