import StackTrace from 'stacktrace-js';
/* tslint:disable:no-console */
const chalk = require('chalk');

export default class Logger {
  private isVerbose: boolean;

  public _verbose = console.log;
  public _error = console.log;

  constructor(verbose: boolean) {
    this.isVerbose = verbose;
  }

  public verbose(tag: string, ...terms: string[]): void {
    if (this.isVerbose) {
      this._verbose(chalk.green(`[${tag}]`), chalk.cyan(...terms));
    }
  }

  public error(...errors: Error[]): Promise<void[]> {
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
