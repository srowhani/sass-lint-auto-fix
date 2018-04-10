import getConfig from '@src/helpers/get-config';
describe('get-config', () => {
  describe('parser', () => {
    it('[handles=yml]', () => {
      const config = getConfig('test/sample-config/config.yml');
      expect(typeof config).toBe('object');
      expect(config.resolvers['property-sort-order']).toBe(1);
    });

    it('[handles=yaml]', () => {
      const config = getConfig('test/sample-config/config.yaml');
      expect(typeof config).toBe('object');
      expect(config.resolvers['property-sort-order']).toBe(1);
    });

    it('[handles=js]', () => {
      const config = getConfig('test/sample-config/config.js');
      expect(typeof config).toBe('object');
      expect(config.resolvers['property-sort-order']).toBe(1);
    });

    it('[handles=ts]', () => {
      const config = getConfig('test/sample-config/config.ts');
      expect(typeof config).toBe('object');
      expect(config.resolvers['property-sort-order']).toBe(1);
    });

    it('[handles=*proxy]', () => {
      const config = getConfig('test/sample-config/config.ts');
      expect(typeof config).toBe('object');
      expect(config.resolvers['property-sort-order']).toBe(1);
    });

    it('[handles=bad export]', () => {
      expect(() => getConfig('test/sample-config/doesnt.exist')).toThrowError(
        /ParseError/,
      );
    });
  });
});
