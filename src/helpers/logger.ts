/* tslint:disable:no-console */
const chalk = require('chalk');

export default class Logger {
  private isVerbose: boolean;

  constructor(verbose: boolean) {
    this.isVerbose = verbose;
  }
  public verbose(tag: string, ...terms: string[]): void {
    if (this.isVerbose) {
      console.log(chalk.green(`[${tag}]`), chalk.blue(...terms));
    }
  }
  public error(...values: string[]): void {
    console.log(...values.map(chalk.red.bold));
  }
}
