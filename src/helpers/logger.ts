import StackTrace from 'stacktrace-js';
/* tslint:disable:no-console */
const chalk = require('chalk');

export default class Logger {
  public _verbose = console.log;
  public _warn = console.log;
  public _error = console.log;

  private isSilent: boolean;
  private _padding: number;

  constructor(silent: boolean = false) {
    this.isSilent = silent;
    this._padding = 10;
  }

  public pad(str: string): string {
    return str + ' '.repeat(this._padding - str.length);
  }

  public verbose(tag: string, ...terms: string[]): void {
    if (!this.isSilent) {
      this._verbose(chalk.green(this.pad(`@${tag}`)), ...terms);
    }
  }

  public warn(tag: string, ...terms: string[]): void {
    if (!this.isSilent) {
      this._warn(chalk.red(this.pad(`@${tag}`)), ...terms);
    }
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
