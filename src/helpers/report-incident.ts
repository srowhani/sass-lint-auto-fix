const Sentry = require('@sentry/node');

Sentry.init({
  dsn: 'https://01713b27b2bf4584a636aa5f2bb68ae7@sentry.io/1213043',
});

type ErrorLike = Error | string;

type ReportDetails = ErrorLike & {
  details: {
    filename: string;
    content: string | Buffer;
    options: any;
  };
};
export const reportIncident = (e: ErrorLike | ReportDetails) =>
  Sentry.captureException(e);
