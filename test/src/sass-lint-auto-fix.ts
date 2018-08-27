import { Logger } from '@src/helpers';
import SlAutoFix from '@src/sass-lint-auto-fix';

describe('sass-lint-auto-fix', () => {
  it('gracefully handles ast parse errors', () => {
    const options = {
      files: {
        include: 'test/sass/parse-error.scss',
      },
      syntax: {
        include: ['scss', 'sass'],
      },
    };

    const slaf = new SlAutoFix(options);

    const logger = new Logger();
    logger._warn = jest.fn();

    slaf._logger = logger;
    slaf.run({}, () => {
      // empty fn
    });
    expect(slaf._logger._warn).toHaveBeenCalledTimes(1);
  });

  it('handles the case where a resolver doesnt exist', () => {
    const ruleName = 'non-existent-rule';
    const options = {
      resolvers: {
        [ruleName]: 1,
      },
      files: {
        include: 'test/sass/property-sort-order.scss',
      },
      syntax: {
        include: ['scss', 'sass'],
      },
    };

    const slaf = new SlAutoFix(options);

    const logger = new Logger();
    logger._warn = jest.fn();

    slaf._logger = logger;

    const generateMockedRuleset = () => [
      {
        rule: {
          name: ruleName,
          defaults: {},
          detect: () => 1,
        },
      },
    ];

    slaf._slRules = generateMockedRuleset;

    slaf.run(
      {
        options: {
          'merge-default-rules': false,
          'cache-config': false,
        },
        rules: { 'non-existent-resolver': 1 },
      },
      () => {
        // empty fn
      },
    );
    expect(slaf._logger._warn).toHaveBeenCalledTimes(1);
    expect(slaf._logger._warn).toBeCalledWith(
      expect.stringContaining('@resolver'),
      expect.stringContaining(`Module '${ruleName}' doesn't exist.`),
    );
  });
});
