import { captureException, init } from '@sentry/node';
const { version } = require('../../package.json');

type ErrorLike = Error | string;

export class SentryService {
  public static get captureException(): typeof captureException {
    if (this.instantiated === false) {
      init({
        dsn: 'https://01713b27b2bf4584a636aa5f2bb68ae7@sentry.io/1213043',
        release: version,
      });
      this.instantiated = true;
    }
    return captureException;
  }
  public static instantiated = false;

  public static reportIncident(e: ErrorLike): void {
    this.captureException(e);
  }
}
