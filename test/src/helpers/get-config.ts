import { getConfig, mergeConfig } from '@src/helpers/get-config';
describe('get-config', () => {
  describe('getConfig', () => {
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
        /Cannot find module/,
      );
    });
  });

  describe('mergeConfig', () => {
    it('does not overwrite objects', () => {
      const defaultConfig = { a: { b: 1 } };
      const extendedConfig = { a: { c: 2 } };
      const resultObject = mergeConfig(defaultConfig, extendedConfig);
      expect(resultObject.a.b).toEqual(1);
      expect(resultObject.a.c).toEqual(2);
    });

    it('overwrites properties', () => {
      const defaultConfig = { a: { b: 1 } };
      const extendedConfig = { a: { b: 2 } };
      const resultObject = mergeConfig(defaultConfig, extendedConfig);
      expect(resultObject.a.b).toEqual(2);
    });
  });
});
