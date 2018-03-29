/* eslint-disable no-console */

const chalk = require('chalk');

export default class Logger {
  _verbose: boolean;

  constructor(verbose: boolean) {
    this._verbose = verbose;
  }
  verbose(tag: string, ...terms: string[]): void {
    if (this._verbose) {
      console.log(
        chalk.green(`[${tag}]`),
        chalk.blue(...terms),
      );
    }
  }
  error(...values: string[]): void {
    console.log(...values.map(chalk.red.bold));
  }
}
