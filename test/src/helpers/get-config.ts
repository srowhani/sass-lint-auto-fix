import { CONFIG_TYPE, getConfig, mergeConfig } from '@src/helpers/get-config';

function slafConfig(configPath: string) {
  return getConfig(CONFIG_TYPE.SASS_LINT_AUTO_FIX, configPath);
}

function assertConfigLoads(configPath: string) {
  const config = slafConfig(configPath);
  expect(typeof config).toBe('object');
  expect(config.resolvers['property-sort-order']).toBe(1);
}

describe('get-config', () => {
  describe('getConfig', () => {
    it('[handles=yml]', () =>
      assertConfigLoads('test/sample-config/config.yml'));
    it('[handles=yaml]', () =>
      assertConfigLoads('test/sample-config/config.yaml'));
    it('[handles=js]', () => assertConfigLoads('test/sample-config/config.js'));
    it('[handles=rc]', () => assertConfigLoads('test/sample-config/configrc'));
    it('[handles=no ext]', () =>
      assertConfigLoads('test/sample-config/config'));
    it('[handles=bad export]', () => {
      expect(() => slafConfig('test/sample-config/doesnt.exist')).toThrowError(
        /no such file or directory/,
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
