import { resolve, detect, lint } from '@test/helpers/resolve';

describe('attribute-quotes', () => {
  describe('scss', () => {
    describe('default', () => {
      const options = { 'attribute-quotes': 1 };
      it('resolves', done => {
        const filename = 'test/sass/attribute-quotes.scss';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);

          expect(preResolve.warningCount).toBe(5);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('exclude', () => {
      const options = {
        'attribute-quotes': [
          1,
          {
            include: false,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/attribute-quotes.scss';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);

          expect(preResolve.warningCount).toBe(7);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
  });

  describe('sass', () => {
    describe('default', () => {
      const options = { 'attribute-quotes': 1 };
      it('resolves', done => {
        const filename = 'test/sass/attribute-quotes.sass';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);

          expect(preResolve.warningCount).toBe(5);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
    describe('exclude', () => {
      const options = {
        'attribute-quotes': [
          1,
          {
            include: false,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/attribute-quotes.sass';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
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
