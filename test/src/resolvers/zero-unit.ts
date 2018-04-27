import resolve, { detect, lint } from '@test/helpers/resolve';
const fs = require('fs');

describe('zero-unit', () => {
  describe('scss', () => {
    describe('[includes: true]', () => {
      const options = {
        'zero-unit': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/zero-unit.scss';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'scss', options);
          // assert no modifications are made
          expect(fs.readFileSync(filename).toString()).toBe(
            resolvedTree.toString(),
          );
          expect(preResolve.warningCount).toBe(2);
          expect(postResolve.warningCount).toBe(2);
          done();
        });
      });
    });
    describe('[includes: false]', () => {
      const options = { 'zero-unit': 1 };
      it('resolves', done => {
        const filename = 'test/sass/zero-unit.scss';
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
    describe('[includes: true]', () => {
      const options = {
        'zero-unit': [
          1,
          {
            include: true,
          },
        ],
      };
      it('resolves', done => {
        const filename = 'test/sass/zero-unit.sass';
        resolve(filename, options, (_, __, resolvedTree) => {
          const preResolve = lint(filename, options);
          const postResolve = detect(resolvedTree.toString(), 'sass', options);
          // assert no modifications are made
          expect(fs.readFileSync(filename).toString()).toBe(
            resolvedTree.toString(),
          );
          expect(preResolve.warningCount).toBe(2);
          expect(postResolve.warningCount).toBe(2);
          done();
        });
      });
    });
    describe('[includes: false]', () => {
      const options = { 'zero-unit': 1 };
      it('resolves', done => {
        const filename = 'test/sass/zero-unit.sass';
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
