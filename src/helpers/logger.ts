/* tslint:disable:no-console */
import chalk from 'chalk';

export interface Configuration {
  silentEnabled?: boolean;
  debugEnabled?: boolean;
  padding?: number;
}

export class Logger {
  public _verbose = console.log;
  public _warn = console.log;
  public _debug = console.log;
  public _error = console.error;

  private silentEnabled: boolean;
  private debugEnabled: boolean;
  private padding: number;

  constructor(config: Configuration = {}) {
    this.silentEnabled = config.silentEnabled || false;
    this.debugEnabled = config.debugEnabled || false;
    this.padding = config.padding || 10;
  }

  public pad(str: string): string {
    return str + ' '.repeat(this.padding - str.length);
  }

  public verbose(tag: string, ...terms: string[]): void {
    if (!this.silentEnabled) {
      this._verbose(chalk.green(this.pad(`@${tag}`)), ...terms);
    }
  }

  public debug(...terms: string[]): void {
    if (this.debugEnabled) {
      this._debug(...terms);
    }
  }

  public warn(tag: string, ...terms: string[]): void {
    if (!this.silentEnabled) {
      this._warn(chalk.red(this.pad(`@${tag}`)), ...terms);
    }
  }

  public error(error: Error | string): void {
    this._error(error);
  }
}
