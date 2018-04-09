# Sasslint Auto Fix  [![NPM Version](https://badge.fury.io/js/sass-lint-auto-fix.svg?style=flat)](https://npmjs.org/package/sass-lint-auto-fix) [![Build Status](https://travis-ci.org/srowhani/sass-lint-auto-fix.svg?branch=master)](https://travis-ci.org/srowhani/sass-lint-auto-fix/) [![Coverage Status](https://coveralls.io/repos/github/srowhani/sass-lint-auto-fix/badge.svg?branch=master)](https://coveralls.io/github/srowhani/sass-lint-auto-fix?branch=master)

## Description
This package serves as a compliment to [sass-lint](https://github.com/sasstools/sass-lint), giving you the ability to resolve
simple linting issues with an easy to use command line interface. Issues are resolved by parsing the `s(a|c)ss` as an [ast](https://github.com/tonyganch/gonzales-pe), traversing through it, and modifying certain branches to be in accordance to the `.sass-lint.yml` standards.

## Getting Started

### Usage

```
  Usage: sass-lint-auto-fix "<pattern>" [options]

  Options:

    -V, --version        output the version number
    -y, --yes            auto resolve any issues
    -c, --config <path>  custom config path
    -v, --verbose        verbose logging
    -h, --help           output usage information
```    


### Installing as a dependency

To begin install the package as a dev-dependency for your repository.

```
npm install --save-dev sass-lint-auto-fix
```

Modify `package.json` scripts to include `lint:fix`

```
{
  ...,
  "scripts": {
    "lint": "sass-lint --verbose",
    "lint:fix": "sass-lint-auto-fix --verbose"
  }
}
```

`lint:fix` works really well with [husky](https://github.com/typicode/husky), which allows you to run commands on hooks that fire when 
running git commands

Add the following to your `package.json`
```
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint:fix && npm run lint",
      "pre-push": "npm test",
      "...": "..."
    }
  }
}
```

### Installing globally

```
npm install -g sass-lint-auto-fix
```

## Configuration

Configuration can be provided through as either json, yml, or js.

The generic structure of the configuration file you would provide would look something like [this](https://github.com/srowhani/sass-lint-auto-fix/blob/master/src/config/default.yml):

```yml
files:
  include: "**/*.s+(a|c)ss"
  ignore: []
syntax:
    include:
      - scss
      - sass
resolvers:
  property-sort-order: 1
  attribute-quotes: 1
  border-zero: 1
  no-color-keywords: 1
  no-css-comments: 1
  no-important: 1
  no-trailing-zero: 1
  space-after-bang: 1
  space-before-bang: 1
  space-after-colon: 1
  space-before-colon: 1
  hex-length: 1
```

By default, all rule "resolvers" are enabled. If you wish to change that, specify a config file when running.

```
  sass-lint-auto-fix -c path/to/config.file
```

#### Disabling Rules

```yml
resolvers:
  property-sort-order: 1
  attribute-quotes: 0
```

In this snippet example, the only rule enabled is `property-sort-order`. If you wish to manually enable certain resolvers, you would do so for each one you wish to include.

For more information about the rules themselves, you can read the [documentation from sass-lint](https://github.com/sasstools/sass-lint/tree/develop/docs/rules)

## Developing

### Setup
```
git clone https://github.com/srowhani/sass-lint-auto-fix.git;
npm install;
npm run build;
```
### Testing

```
npm run test
```

