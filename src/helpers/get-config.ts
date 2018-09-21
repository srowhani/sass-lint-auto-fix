import { SlfParserOptions } from '../typings';

const merge = require('merge');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

type OptionParser = (filename: string) => SlfParserOptions | null;
interface MappedParserOptions {
  [key: string]: OptionParser;
}
interface JSONObject {
  [key: string]: any;
}

const _configurationProxy = new Proxy<MappedParserOptions>(
  {
    yml: parseYaml,
    yaml: parseYaml,
    json: parseJSON,
    ['*']: parseModule,
  },
  {
    get: (target: MappedParserOptions, filename: string) => {
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

export const getConfig = (filename: string): JSONObject =>
  _configurationProxy[filename];

export const mergeConfig = (
  baseConfig: JSONObject,
  extendedConfig: JSONObject,
) => merge.recursive(true, baseConfig, extendedConfig);
