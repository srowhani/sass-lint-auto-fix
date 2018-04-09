import resolve, { detect, lint } from '@test/helpers/resolve';

describe('hex-length', () => {
  describe('scss', () => {
    describe('[style: short]', () => {
      const options = {
        'hex-length': 1,
      };
      it('resolves', done => {
        const filename = 'test/sass/hex-length.scss';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);

          expect(preResolve.warningCount).toBe(4);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });

    describe('[style: long]', () => {
      const options = {
        'hex-length': [
          1,
          {
            style: 'long',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/hex-length.scss';
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
    describe('[style: short]', () => {
      const options = {
        'hex-length': 1,
      };
      it('resolves', done => {
        const filename = 'test/sass/hex-length.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(4);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });

    describe('[style: long]', () => {
      const options = {
        'hex-length': [
          1,
          {
            style: 'long',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/hex-length.sass';
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
