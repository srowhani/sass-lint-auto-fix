import { exec, maybeBuild } from '@test/helpers/cmd';

const CLI_TEST_TIMEOUT = 10_000;

describe('cli', async () => {
  beforeAll(maybeBuild);
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
    'sets up sentry by default',
    async () => {
      const result = await exec(
        'node dist/index.js -c "test/config/opt-in.yml" --debug',
      );
      expect(result).toContain('Installing sentry');
    },
    CLI_TEST_TIMEOUT,
  );

  it(
    'opts out with config flag',
    async () => {
      const result = await exec(
        'node dist/index.js -c "test/config/opt-out-ignore-all.yml" --debug',
      );
      expect(result).not.toContain('Installing sentry');
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
