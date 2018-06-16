import { SlfParserOptions } from '@src/typings.d';

const merge = require('merge');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const _configurationProxy = new Proxy(
  {
    yml: parseYaml,
    yaml: parseYaml,
    json: parseJSON,
    ['*']: parseModule,
  },
  {
    get: (target: any, filename: string) => {
      const possibleResolutions = Object.keys(target)
        .map(key => target[key](filename))
        .filter(result => result !== null);

      if (possibleResolutions.length === 0) {
        throw Error(
          `ParseError - Unable to parse configuration file ${filename}`,
        );
      }
      return possibleResolutions[0];
    },
  },
);

function parseYaml(filename: string): SlfParserOptions | null {
  try {
    return yaml.safeLoad(fs.readFileSync(filename).toString());
  } catch (e) {
    return null;
  }
}

function parseJSON(filename: string): SlfParserOptions | null {
  try {
    const file = fs.readFileSync(filename).toString();
    return JSON.parse(file);
  } catch (e) {
    return null;
  }
}

function parseModule(filename: string): SlfParserOptions | null {
  try {
    return require(path.resolve(filename));
  } catch (e) {
    return null;
  }
}

function sanitize(obj: any) {
  return Object.keys(obj)
    .filter(key => obj[key] !== null)
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
}

export const getConfig = (filename: string): any => {
  return sanitize(_configurationProxy[filename]);
};

export const mergeConfig = (baseConfig: any, extendedConfig: any) =>
  merge.recursive(true, baseConfig, extendedConfig);
