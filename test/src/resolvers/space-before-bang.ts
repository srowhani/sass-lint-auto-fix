import resolve, { detect, lint } from '@test/helpers/resolve';

describe('space-before-bang', () => {
  describe('scss', () => {
    describe('- include', () => {
      const options = { 'space-before-bang': 1 };

      it('resolves', done => {
        const filename = 'test/sass/space-before-bang.scss';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);
          expect(preResolve.warningCount).toBe(4);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('- exclude', () => {
      const options = {
        'space-before-bang': [
          1,
          {
            include: false,
          },
        ],
      };

      it('resolves', done => {
        const filename = 'test/sass/space-before-bang.scss';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);
          expect(preResolve.warningCount).toBe(4);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
  });

  describe('sass', () => {
    describe('- include', () => {
      const options = { 'space-before-bang': 1 };

      it('resolves', done => {
        const filename = 'test/sass/space-before-bang.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);
          expect(preResolve.warningCount).toBe(4);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('- exclude', () => {
      const options = {
        'space-before-bang': [
          1,
          {
            include: false,
          },
        ],
      };

      it('resolves', done => {
        const filename = 'test/sass/space-before-bang.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);
          expect(preResolve.warningCount).toBe(4);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
  });
});
