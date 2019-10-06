const Sentry = require('@sentry/node');
const { version } = require('../../package.json');

type ErrorLike = Error | string;

export class SentryService {
  public static getInstance() {
    if (this.instantiated === false) {
      Sentry.init({
        dsn: 'https://01713b27b2bf4584a636aa5f2bb68ae7@sentry.io/1213043',
        release: version,
      });
      this.instantiated = true;
    }
    return Sentry;
  }

  public static reportIncident(e: ErrorLike): void {
    this.getInstance().captureException(e);
  }
  private static instantiated = false;
}
