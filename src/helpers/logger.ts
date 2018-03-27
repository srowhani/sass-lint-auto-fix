const chalk = require('chalk');

export default class Logger {
  private _verbose: boolean;

  constructor (verbose) {
    this._verbose = verbose;
  }
  verbose (tag: string, ...terms: string[]): void {
    if (this._verbose) {
      console.log(
        chalk.green(`[${tag}]`),
        chalk.blue(...terms)
      )
    }
  }
}
