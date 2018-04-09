import resolve, { detect, lint } from '@test/helpers/resolve';

describe('space-after-bang', () => {
  describe('scss', () => {
    describe('[include: false]', () => {
      const options = {
        'space-after-bang': [
          1,
          {
            include: false,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/space-after-bang.scss';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);

          expect(preResolve.warningCount).toBe(7);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('[include: true]', () => {
      const options = {
        'space-after-bang': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/space-after-bang.scss';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);
          expect(preResolve.warningCount).toBe(7);
          // TODO: sass-lint reports errors on include space
          expect(postResolve.warningCount).toBe(14);
          done();
        });
      });
    });
  });

  describe('sass', () => {
    describe('[include: false]', () => {
      const options = { 'space-after-bang': 1 };
      it('resolves', done => {
        const filename = 'test/sass/space-after-bang.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(7);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('[include: true]', () => {
      const options = {
        'space-after-bang': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/space-after-bang.sass';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);
          expect(preResolve.warningCount).toBe(7);
          // TODO: sass-lint reports errors on include space
          expect(postResolve.warningCount).toBe(14);
          done();
        });
      });
    });
  });
});
