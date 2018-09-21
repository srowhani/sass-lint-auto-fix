import childProcess from 'child_process';
import fs from 'fs';

export const maybeBuild = () =>
  new Promise(resolve => {
    fs.stat(
      'dist/index.js',
      (error: Error) =>
        error ? exec('npm run build').then(resolve) : resolve(),
    );
  });

export const build = () => exec('npm run build');

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
