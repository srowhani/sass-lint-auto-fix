import resolve, { detect, lint } from '@test/helpers/resolve';

describe('space-after-colon', () => {
  const options = { 'space-after-colon': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/space-after-colon.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, options);
        const postResolve = detect(resolvedTree.toString(), 'scss', options);

        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });

  describe('sass', () => {
    it('resolves', done => {
      const filename = 'test/sass/space-after-colon.sass';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, options);
        const postResolve = detect(resolvedTree.toString(), 'sass', options);

        expect(preResolve.warningCount).toBe(3);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
