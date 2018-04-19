module.exports = {
  verifyConditions: [
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
  prepare: [
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
};
