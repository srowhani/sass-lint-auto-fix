import resolve, { detect, lint } from '@test/helpers/resolve';

describe('hex-notation', () => {
  describe('scss', () => {
    describe('[style=default]', () => {
      const options = { 'hex-notation': 1 };
      it('resolves', done => {
        const filename = 'test/sass/hex-notation.scss';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);

          expect(preResolve.warningCount).toBe(6);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('[style=lowercase]', () => {
      const options = {
        'hex-notation': [
          1,
          {
            style: 'lowercase',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/hex-notation.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(6);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('[style=uppercase]', () => {
      const options = {
        'hex-notation': [
          1,
          {
            style: 'uppercase',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/hex-notation.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(7);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
  });
  describe('sass', () => {
    describe('[style=default]', () => {
      const options = { 'hex-notation': 1 };
      it('resolves', done => {
        const filename = 'test/sass/hex-notation.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(6);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('[style=lowercase]', () => {
      const options = {
        'hex-notation': [
          1,
          {
            style: 'lowercase',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/hex-notation.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(6);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('[style=uppercase]', () => {
      const options = {
        'hex-notation': [
          1,
          {
            style: 'uppercase',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/hex-notation.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(7);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
  });
});
