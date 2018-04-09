import Logger from '@src/helpers/logger';

describe('logger', () => {
  describe('verbose', () => {
    it('[=false]', () => {
      const logger = new Logger(false);
      logger._verbose = jest.fn();
      logger.verbose('test');
      expect(logger._verbose).toHaveBeenCalledTimes(0);
    });
    it('[=true]', () => {
      const logger = new Logger(true);
      logger._verbose = jest.fn();
      logger.verbose('test');
      expect(logger._verbose).toHaveBeenCalledTimes(1);
    });
  });
  describe('error', () => {
    it('prints all errors', done => {
      const logger = new Logger(false);
      const testError = Error('test');
      logger._error = jest.fn();

      logger.error(testError).then(_ => {
        expect(logger._error).toHaveBeenCalledTimes(1);
        logger.error(testError, testError).then(_ => {
          expect(logger._error).toHaveBeenCalledTimes(3);
          done();
        });
      });
    });
  });
});
