#!/usr/bin/env node
(async () => {
  const program = require('commander');
  const pkg = require('./package.json')
  const gonzales = require('gonzales-pe-sl');
  const fs = require('fs');

  const sassLint = require('sass-lint');
  const sassLintConfig = require('sass-lint/lib/config');
  const sassLintHelpers = require('sass-lint/lib/helpers');
  const sassLintRules = require('sass-lint/lib/rules');

  const { resolve } = require('./src/helpers/module-resolver');

  program
    .version(pkg.version)
    .option('-y', '--yes', 'auto resolve any issues')
    .option('-c', '--config', 'custom configuration path')
    .option('-v', '--verbose', 'enable verbose logging')
    .parse(process.argv);

  const testFile = __dirname + '/src/test.scss';
  const file = fs.readFileSync(testFile);

  const ast = gonzales.parse(file.toString(), {
    syntax: 'scss'
  });

  const _options = {};
  const config = sassLintConfig(_options, 'node_modules/sass-lint/config/')

  const rules = sassLintRules(config)

  rules.forEach(rule => {
    const resolver = resolve(`${rule.rule.name}`)
      .then(ResolverClass => {
        console.log(`Running fix ${rule.rule.name} on ${testFile}`);
        const resolver = new ResolverClass(ast, rule);
        resolver.fix();
        fs.writeFileSync(testFile, ast.toString());
      }).catch(e => {
        if (rule.rule.name === 'property-sort-order')
          console.log(e)
      });
  })

})();
