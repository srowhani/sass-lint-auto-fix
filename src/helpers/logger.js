const chalk = require('chalk');

export default class Logger {
  constructor (verbose) {
    this._verbose = verbose;
  }
  info () {

  };
  verbose (tag, ...terms) {
    if (this._verbose) {
      console.log(
        chalk.green(`[${tag}]`),
        chalk.blue(...terms)
      )
    }
  }
}
