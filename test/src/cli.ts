import { exec, maybeBuild } from '@test/helpers/cmd';

describe('cli', async () => {
  beforeAll(maybeBuild);

  it('prints help dialog with -h flag', async () => {
    const result = await exec('node dist/index.js -h');
    expect(result).toContain('-h, --help');
    expect(result).toContain('-s, --silent');
    expect(result).toContain('-c, --config <path>');
    expect(result).toContain('-V, --version');
  });

  it('sets up sentry by default', async () => {
    const result = await exec('node dist/index.js -c "test/config/opt-in.yml"');
    expect(result).toContain('Setting up sentry');
  });

  it('opts out with config flag', async () => {
    const result = await exec(
      'node dist/index.js -c "test/config/opt-out.yml"',
    );
    expect(result).not.toContain('Setting up sentry');
  });
});
