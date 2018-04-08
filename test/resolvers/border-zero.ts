import resolve, { detect, lint } from '@test/helpers/resolve';

describe('border-zero', () => {
  describe('scss', () => {
    describe('[convention: 0]', () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 0,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/border-zero.scss';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);

          expect(preResolve.warningCount).toBe(3);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe("[convention: '0']", () => {
      const options = { 'border-zero': 1 };
      it('resolves', done => {
        const filename = 'test/sass/border-zero.scss';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);

          expect(preResolve.warningCount).toBe(3);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe("[convention: 'none']", () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 'none',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/border-zero.scss';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);

          const postResolve = detect(resolvedTree.toString(), 'scss', options);
          expect(preResolve.warningCount).toBe(2);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe("invalid convention [convention: 'zero']", () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 'zero',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/border-zero.scss';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
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
    describe('[convention: 0]', () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 0,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/border-zero.sass';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(3);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe("[convention: '0']", () => {
      const options = { 'border-zero': 1 };
      it('resolves', done => {
        const filename = 'test/sass/border-zero.sass';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(3);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe("[convention: 'none']", () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 'none',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/border-zero.sass';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(2);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe("invalid convention [convention: 'zero']", () => {
      const options = {
        'border-zero': [
          1,
          {
            convention: 'zero',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/border-zero.sass';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
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
