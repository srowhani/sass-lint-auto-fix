import resolve, { detect, lint } from '@test/helpers/resolve';

describe('final-newline', () => {
  describe('scss', () => {
    describe('[include: true]', () => {
      const options = {
        'final-newline': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/final-newline-include.scss';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);

          expect(preResolve.warningCount).toBe(1);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('[include: false]', () => {
      const options = {
        'final-newline': [
          1,
          {
            include: false,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/final-newline-none.scss';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);

          expect(preResolve.warningCount).toBe(1);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
  });

  describe('sass', () => {
    describe('[include: true]', () => {
      const options = {
        'final-newline': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/final-newline-include.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(1);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('[include: false]', () => {
      const options = {
        'final-newline': [
          1,
          {
            include: false,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/final-newline-none.sass';
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
});
