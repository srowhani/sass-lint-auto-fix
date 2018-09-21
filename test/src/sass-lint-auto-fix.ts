import { Logger } from '@src/helpers';
import { autoFixSassFactory } from '@src/sass-lint-auto-fix';
import { ConfigOpts, LintOpts, ValidFileType } from '@src/typings';

describe('sass-lint-auto-fix', () => {
  it('gracefully handles ast parse errors', () => {
    const logger = new Logger();
    logger._warn = jest.fn();

    const options = {
      logger,
      files: {
        include: 'test/sass/parse-error.scss',
      },
      syntax: {
        include: ['scss', 'sass'],
      },
    };

    const slaf = autoFixSassFactory(options as ConfigOpts);

    const resolutions = [...slaf({} as LintOpts)];
    expect(resolutions).toEqual([]);
    expect(logger._warn).toHaveBeenCalledTimes(1);
  });

  it('skips empty files', () => {
    const logger = new Logger();
    logger._warn = jest.fn();

    const options = {
      logger,
      files: {
        include: 'test/sass/empty-file.*',
      },
      syntax: {
        include: ['scss', 'sass'],
      },
    };

    const slaf = autoFixSassFactory(options as ConfigOpts);
    const resolutions = [...slaf({} as LintOpts)];
    expect(resolutions.length).toEqual(0);
  });

  it('handles the case where a resolver doesnt exist', () => {
    const ruleName = 'non-existent-rule';

    const logger = new Logger();
    logger._warn = jest.fn();

    const generateMockedRuleset = () => [
      {
        rule: {
          name: ruleName,
          defaults: {},
          detect: () => 1,
        },
      },
    ];

    const configOpts: ConfigOpts = {
      logger,
      resolvers: {
        [ruleName]: 1,
      },
      files: {
        include: 'test/sass/property-sort-order.scss',
      },
      syntax: {
        include: [ValidFileType.scss, ValidFileType.sass],
      },
      slRules: generateMockedRuleset,
    } as any;

    const lintOpts: LintOpts = {
      options: {
        'merge-default-rules': false,
        'cache-config': false,
      },
      rules: { 'non-existent-resolver': 1 },
    } as any;
    const slaf = autoFixSassFactory(configOpts);

    const resolutions = [...slaf(lintOpts)];
    expect(resolutions).toEqual([]);
    expect(logger._warn).toHaveBeenCalledTimes(1);
    expect(logger._warn).toBeCalledWith(
      expect.stringContaining('@resolver'),
      expect.stringContaining(`Module '${ruleName}' doesn't exist.`),
    );
  });
});
