import StackTrace from 'stacktrace-js';
/* tslint:disable:no-console */
const chalk = require('chalk');

export default class Logger {
  public _verbose = console.log;
  public _warn = console.log;
  public _error = console.log;

  private isVerbose: boolean;
  private _padding: number;

  constructor(verbose: boolean) {
    this.isVerbose = verbose;
    this._padding = 10;
  }

  public verbose(tag: string, ...terms: string[]): void {
    if (this.isVerbose) {
      this._verbose(chalk.green(`@${tag}`.padEnd(this._padding)), ...terms);
    }
  }

  public warn(tag: string, ...terms: string[]): void {
    this._warn(chalk.red(`@${tag}`.padEnd(this._padding)), ...terms);
  }

  public error(...errors: (Error)[]): Promise<void[]> {
    return Promise.all(
      errors.map((error: Error) => {
        return StackTrace.fromError(error).then(frames => {
          const formattedError = chalk.black.bgRed.bold(
            frames.reduce((acc, curr) => `${acc}\n${curr.toString()}`, ''),
          );
          this._error(formattedError);
          return formattedError;
        });
      }),
    );
  }
}
