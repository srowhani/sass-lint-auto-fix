module.exports = {
  analyzeCommits: {
    preset: 'angular',
    releaseRules: [{ type: 'breaking', release: 'major' }],
  },

  // no verify for npm, it breaks in the pkgRoot case, always expecting a package.json
  // file but semantic-release-alt-publish-dir will create it automatically.
  // the npm package will verify itself again anyway in the prepare step.
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
  prepare: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
};
