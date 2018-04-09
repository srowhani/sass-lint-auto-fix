import resolve, { detect, lint } from '@test/helpers/resolve';

describe('property-sort-order', () => {
  describe('- scss', () => {
    describe('- alphabetical', () => {
      const options = { 'property-sort-order': 1 };
      it('resolves', done => {
        const filename = 'test/sass/property-sort-order.scss';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);
          expect(preResolve.warningCount).toBe(19);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });

    describe('- smacss', () => {
      const options = {
        'property-sort-order': [
          1,
          {
            order: 'smacss',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/property-sort-order.scss';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);
          expect(preResolve.warningCount).toBe(12);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });

    describe('- recess', () => {
      const options = {
        'property-sort-order': [
          1,
          {
            order: 'recess',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/property-sort-order.scss';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);
          expect(preResolve.warningCount).toBe(12);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
  });

  describe('- sass', () => {
    describe('- alphabetical', () => {
      const options = { 'property-sort-order': 1 };
      it('resolves', done => {
        const filename = 'test/sass/property-sort-order.sass';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);
          expect(preResolve.warningCount).toBe(15);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });

    describe('- smacss', () => {
      const options = {
        'property-sort-order': [
          1,
          {
            order: 'smacss',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/property-sort-order.sass';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);
          expect(preResolve.warningCount).toBe(16);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });

    describe('- recess', () => {
      const options = {
        'property-sort-order': [
          1,
          {
            order: 'recess',
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/property-sort-order.sass';
        resolve(filename, { ...options }, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);
          expect(preResolve.warningCount).toBe(16);
          expect(postResolve.warningCount).toBe(0);
          done();
        });
      });
    });
  });
});
