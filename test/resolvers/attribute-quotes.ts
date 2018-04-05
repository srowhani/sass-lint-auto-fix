import resolve, { detect, lint } from '@test/helpers/resolve';

describe('attribute-quotes', () => {
  const options = { 'attribute-quotes': 1 };
  it('resolves', done => {
    const filename = 'test/sass/attribute-quotes.scss';
    resolve(filename, options, (_, __, resolvedTree) => {
      const preResolve = lint(filename, {
        'attribute-quotes': 1,
      });
      const postResolve = detect(resolvedTree.toString(), 'scss', {
        'attribute-quotes': 1,
      });

      expect(preResolve.warningCount).toBe(5);
      expect(postResolve.warningCount).toBe(0);
      done();
    });
  });
});
