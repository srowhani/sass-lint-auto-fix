import Logger from '@src/helpers/logger';
import SlAutoFix from '@src/sass-lint-fix';

describe('sass-lint-auto-fix', () => {
  it('gracefully handles ast parse errors', done => {
    const options = {
      files: {
        include: 'test/sass/parse-error.scss',
      },
      syntax: {
        include: ['scss', 'sass'],
      },
    };

    const slaf = new SlAutoFix(options);

    const logger = new Logger(true);
    logger._warn = jest.fn();

    slaf._logger = logger;
    slaf.run({}, () => {
      // empty fn
    });
    setTimeout(() => {
      expect(slaf._logger._warn).toHaveBeenCalledTimes(1);
      done();
    }, 350);
  });
});
