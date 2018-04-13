import resolve, { detect, lint } from '@test/helpers/resolve';

describe('space-before-colon', () => {
  const options = { 'space-before-colon': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/space-before-colon.scss';
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
      const filename = 'test/sass/space-before-colon.sass';
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
