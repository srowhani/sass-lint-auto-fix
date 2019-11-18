import { createLogger, getConfig } from '@src/helpers';
import { autoFixSassFactory } from '@src/sass-lint-auto-fix';
import { ConfigOpts, ValidFileType } from '@src/types';
import { LintOpts } from 'sass-lint';

export const generateMockedRuleset = (ruleName: string) => [
  {
    rule: {
      name: ruleName,
      defaults: {},
      detect: () => [1],
    },
  },
];

describe('sass-lint-auto-fix', () => {
  it('gracefully handles ast parse errors', () => {
    const logger = createLogger();
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
    const logger = createLogger();
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

    const logger = createLogger();
    logger._warn = jest.fn();

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
      slRules: () => generateMockedRuleset(ruleName),
      options: {
        optOut: true,
      },
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
  it('can receive custom sl-config', () => {
    const filename = 'test/sass/custom-sl-config.scss';

    const configOpts: ConfigOpts = {
      logger: createLogger({ silentEnabled: true }),
      resolvers: {
        'final-newline': 1,
      },
      files: {
        include: filename,
      },
      syntax: {
        include: [ValidFileType.scss],
      },
      options: {
        optOut: true,
      },
    } as any;

    const slaf = autoFixSassFactory(configOpts);

    const customSlConfig = getConfig(
      'test/config/custom-sl-config.yml',
    ) as LintOpts;

    expect(customSlConfig).toEqual({
      options: {
        formatter: 'stylish',
      },
      files: {
        include: filename,
      },
      rules: {
        'final-newline': 1,
        'property-sort-order': 1,
      },
    });

    const resolutionSet = [...slaf(customSlConfig)];
    expect(resolutionSet.length).toEqual(1);

    customSlConfig.rules['final-newline'] = 0;

    const emptyResolutionSet = [...slaf(customSlConfig)];
    expect(emptyResolutionSet.length).toEqual(0);
  });
});
