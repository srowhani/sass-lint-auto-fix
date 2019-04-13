import { Nullable, SlfParserOptions } from '../typings';

const merge = require('merge');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

type OptionParser = (filename: string) => Nullable<SlfParserOptions>;
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
  },
  {
    get(target: MappedParserOptions, filename: string) {
      const resolvedParserKey = Object.keys(target).find(targetExtension =>
        filename.endsWith(`.${targetExtension}`),
      );

      const resolvedParser =
        (resolvedParserKey && target[resolvedParserKey]) || parseModule;

      return resolvedParser(filename);
    },
  },
);

function parseYaml(filename: string): Nullable<SlfParserOptions> {
  return yaml.safeLoad(fs.readFileSync(filename).toString());
}

function parseJSON(filename: string): Nullable<SlfParserOptions> {
  const file = fs.readFileSync(filename).toString();
  return JSON.parse(file);
}

function parseModule(filename: string): Nullable<SlfParserOptions> {
  return require(path.resolve(filename));
}

export const getConfig = (filename: string): JSONObject =>
  _configurationProxy[filename];

export const mergeConfig = (
  baseConfig: JSONObject,
  extendedConfig: JSONObject,
) => merge.recursive(true, baseConfig, extendedConfig);
