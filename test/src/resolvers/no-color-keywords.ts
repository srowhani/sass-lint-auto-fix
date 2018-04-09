import resolve, { detect, lint } from '@test/helpers/resolve';

describe('no-color-keywords', () => {
  const options = { 'no-color-keywords': 1 };

  describe('scss', () => {
    it('resolves', done => {
      const filename = 'test/sass/no-color-keywords.scss';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'no-color-keywords': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'scss', {
          'no-color-keywords': 1,
        });

        expect(preResolve.warningCount).toBe(8);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });

  describe('sass', () => {
    it('resolves', done => {
      const filename = 'test/sass/no-color-keywords.sass';
      resolve(filename, options, (_, __, resolvedTree) => {
        const preResolve = lint(filename, {
          'no-color-keywords': 1,
        });
        const postResolve = detect(resolvedTree.toString(), 'sass', {
          'no-color-keywords': 1,
        });

        expect(preResolve.warningCount).toBe(8);
        expect(postResolve.warningCount).toBe(0);
        done();
      });
    });
  });
});
