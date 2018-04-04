import StackTrace from 'stacktrace-js';
/* tslint:disable:no-console */
const chalk = require('chalk');

export default class Logger {
  private isVerbose: boolean;

  constructor(verbose: boolean) {
    this.isVerbose = verbose;
  }
  public verbose(tag: string, ...terms: string[]): void {
    if (this.isVerbose) {
      console.log(chalk.green(`[${tag}]`), chalk.cyan(...terms));
    }
  }
  public error(...errors: Error[]): void {
    errors.forEach((error: Error) => {
      StackTrace.fromError(error).then(frames =>
        console.log(
          chalk.black.bgRed.bold(
            frames.reduce((acc, curr) => `${acc}\n${curr.toString()}`, ''),
          ),
        ),
      );
    });
  }
}
