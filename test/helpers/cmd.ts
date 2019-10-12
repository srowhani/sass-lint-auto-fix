const childProcess = require('child_process');
const fs = require('fs');

export const maybeBuild = () =>
  new Promise(resolve => {
    fs.stat('dist/index.js', (error: Error) =>
      error ? build().then(resolve) : resolve(),
    );
  });

export const build = () => exec('yarn build');

export const exec = (
  command: string,
  options = {},
): Promise<Error | string | Buffer> =>
  new Promise((resolve, reject) => {
    childProcess.exec(
      command,
      options,
      (error: Error, output: string | Buffer) =>
        error ? reject(error) : resolve(output),
    );
  });
