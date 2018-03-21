(async () => {
  const program = require('commander');
  const pkg = require('../package.json')
  const gonzales = require('gonzales-pe-sl');

  const sassLint = require('sass-lint');
  const sassLintConfig = require('sass-lint/lib/config');
  const sassLintHelpers = require('sass-lint/lib/helpers');
  const sassLintRules = require('sass-lint/lib/rules');
  const fs = require('fs');

  program
    .version(pkg.version)
    .option('-y', '--yes', 'auto resolve any issues')
    .option('-c', '--config', 'custom configuration path')
    .option('-v', '--verbose', 'enable verbose logging')
    .parse(process.argv);

  const testFile = __dirname + '/test.scss';
  const file = fs.readFileSync(testFile);
  const ast = gonzales.parse(file.toString(), {
    syntax: 'scss'
  });
  const options = {};
  const configPath = {};

  // const ruleResolver = await import('./helpers/for-each-resolver')
  const config = sassLintConfig({}, 'node_modules/sass-lint/config/')
  console.log(config);

  const rules = sassLintRules(config)
  console.log(rules);
  // const availableResolvers = rules.map(async rule => await import(`${__dirname}/property-sort-order`).catch(err => console.log('noooo'))
  //
  //   .then(module => module.default)
  //   .then(_instance => new _instance(ast, rule))
  // ).filter(resolver => !!resolver);
  //
  // availableResolvers.forEach(resolver => resolver.fix());

})();
