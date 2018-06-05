const fs = require('fs');
const childProcess = require('child_process');

export const maybeBuild = (): Promise<any> =>
  new Promise(resolve => {
    fs.stat(
      'dist/index.js',
      (error: Error) =>
        error ? exec('npm run build').then(resolve) : resolve(),
    );
  });

export const build = (): Promise<any> => exec('npm run build');

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
