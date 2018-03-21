const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: 'empty',
    child_process: 'empty',
    __dirname: true,
    __filename: true
  },
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'node'
};
