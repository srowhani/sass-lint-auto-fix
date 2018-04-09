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

