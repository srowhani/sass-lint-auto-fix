import { Logger } from '@src/helpers';

describe('logger', () => {
  describe('silent', () => {
    it('[=true]', () => {
      const logger = new Logger({ silentEnabled: true });
      logger._verbose = jest.fn();
      logger.verbose('test');
      expect(logger._verbose).toHaveBeenCalledTimes(0);
    });
    it('[=false]', () => {
      const logger = new Logger({ silentEnabled: false });
      logger._verbose = jest.fn();
      logger.verbose('test');
      expect(logger._verbose).toHaveBeenCalledTimes(1);
    });
  });

  describe('warn', () => {
    it('prints', () => {
      const logger = new Logger({ silentEnabled: false });
      logger._warn = jest.fn();
      logger.warn('test');
      expect(logger._warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('error', () => {
    it('prints all errors', () => {
      const logger = new Logger({ silentEnabled: false });
      const testError = Error('test');
      logger._error = jest.fn();
      logger.error(testError);
      expect(logger._error).toHaveBeenCalledTimes(1);
    });
  });

  describe('debug', () => {
    it('is silent with debugEnabled=false', () => {
      const logger = new Logger({ debugEnabled: false });
      logger._debug = jest.fn();
      logger.debug('test');
      expect(logger._debug).toHaveBeenCalledTimes(0);
    });

    it('it prints debug when enabled', () => {
      const logger = new Logger({ debugEnabled: true });
      logger._debug = jest.fn();
      logger.debug('test');
      expect(logger._debug).toHaveBeenCalledTimes(1);
    });
  });

  describe('pad', () => {
    it('appends spaces at the end of a string', () => {
      const logger = new Logger({ padding: 5 });
      expect(logger.pad('foo')).toBe('foo  ');
      expect(logger.pad('foobaz')).toBe('foobaz');
    });
  });
});
