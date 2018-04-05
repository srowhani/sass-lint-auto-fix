const process = require('process');

export default function resolve(_definedResolver: string) {
  const dir = process.cwd();
  return Promise.resolve(
    require(`${dir}/dist/resolvers/${_definedResolver}`).default,
  );
}
