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

  const _defaultOptions = {};

  const promptOptions = [
    {
      alias: '-y',
      prop: 'yes',
      desc: 'auto resolve any issues'
    }, {
      alias: '-c',
      prop: 'config',
      desc: 'custom configuration path'
    }, {
      alias: '-v',
      prop: 'verbose',
      desc: 'enable verbose logging'
    }
  ]

  promptOptions.reduce(
    (program, {alias, prop, desc}) => program.option(alias, `--${prop}`, desc),
    program
  ).version(pkg.version)
  .parse(process.argv);

  const options = Object.assign(_defaultOptions, promptOptions.map(option => program[option.prop]));

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
