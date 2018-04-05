import resolve, { detect, lint } from '@test/helpers/resolve';

describe('property-sort-order', () => {
  describe('- scss', () => {
    describe('- alphabetical', () => {
      it('resolves', done => {
        const filename = 'test/sass/property-sort-order.scss';
        resolve(filename, { 'property-sort-order': 1 }, ({ resolvedTree }) => {
          const preResolve = lint(filename, { 'property-sort-order': 1 });
          const postResolve = detect('property-sort-order', resolvedTree);
          expect(preResolve.warningCount).toBe(15);
          expect(postResolve.length).toBe(0);
          done();
        });
      });
    });

    describe('- smacss', () => {
      it('resolves', done => {
        const filename = 'test/sass/property-sort-order.scss';
        resolve(filename, { 'property-sort-order': 1 }, ({ resolvedTree }) => {
          const preResolve = lint(filename, {
            'property-sort-order': [
              1,
              {
                order: 'smacss',
              },
            ],
          });
          const postResolve = detect('property-sort-order', resolvedTree);
          expect(preResolve.warningCount).toBe(12);
          expect(postResolve.length).toBe(0);
          done();
        });
      });
    });

    describe('- recess', () => {
      it('resolves', done => {
        const filename = 'test/sass/property-sort-order.scss';
        resolve(filename, { 'property-sort-order': 1 }, ({ resolvedTree }) => {
          const preResolve = lint(filename, {
            'property-sort-order': [
              1,
              {
                order: 'recess',
              },
            ],
          });
          const postResolve = detect('property-sort-order', resolvedTree);
          expect(preResolve.warningCount).toBe(12);
          expect(postResolve.length).toBe(0);
          done();
        });
      });
    });
  });
});
