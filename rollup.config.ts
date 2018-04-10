import typescript from 'rollup-plugin-typescript2';
import hashbang from 'rollup-plugin-hashbang'
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';

const pkg = require('./package.json');

const libraryName = pkg.name;

/**
 * Include all of the dependencies here to exclude all node modules from the build
 * Make sure to also include node libraries you're using e.g. 'crypto'
 */

const external = [...Object.keys(pkg.dependencies || {})];

/**
 * Include all of the dependencies again here to squash rollup warnings
 */
const globals = {};

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.bin["sass-lint-auto-fix"],
      name: libraryName,
      format: 'umd',
      globals
    },
  ],

  // exclude all node modules
  external,
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Compile TypeScript files
    copy({
      "src/config/default.yml": "dist/config/default.yml",
      verbose: true
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig-build.json',
    }),
    // Resolve source maps to the original source
    hashbang(),
  ],
};
