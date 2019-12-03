import { build, exec } from '@test/helpers/cmd';
import { version } from '../../package.json';

const CLI_TEST_TIMEOUT = 10_000;

describe('cli', () => {
  beforeAll(build);

  it('returns correct version', async () => {
    const versionResult = await exec('node dist/index.js -V');
    expect(versionResult).toContain(version);
  });

  it(
    'prints help dialog with -h flag',
    async () => {
      const result = await exec('node dist/index.js -h');
      expect(result).toContain('-h, --help');
      expect(result).toContain('-s, --silent');
      expect(result).toContain('-d, --debug');
      expect(result).toContain('-c, --config <path>');
      expect(result).toContain('-V, --version');
    },
    CLI_TEST_TIMEOUT,
  );

  it(
    'can take sass-lint config successfully',
    async () => {
      const result = await exec(
        'node dist/index.js -c "test/config/custom-slaf-config.yml" --config-sass-lint "test/config/custom-sl-config.yml" --debug',
      );

      expect(result).not.toContain(
        'Running resolver "final-newline" on "test/sass/custom-sl-config.scss"',
      );
      expect(result).not.toContain(
        'Running resolver "property-sort-order" on "test/sass/custom-sl-config.scss"',
      );
    },
    CLI_TEST_TIMEOUT,
  );
});
