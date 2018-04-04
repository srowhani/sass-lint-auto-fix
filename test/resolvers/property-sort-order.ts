import resolve, { ast, detect } from '@test/helpers/resolve';

describe('property-sort-order.scss', () => {
  it('corrects the file', () => {
    const filename = './sass/property-sort-order.scss';
    resolve(
      `./sass/${filename}`,
      { 'property-sort-order': 1 },
      ({ resolvedTree }) => {
        const detects = detect(
          'property-sort-order',
          ast(`./sass/${filename}`),
        );
        const postResolveDetects = detect('property-sort-order', resolvedTree);
        console.log(detects.length, postResolveDetects.length);
        expect(postResolveDetects.length).toBeLessThan(detects.length);
      },
    );
  });
});
