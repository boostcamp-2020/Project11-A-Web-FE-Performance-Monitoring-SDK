const path = require('path');
module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules\/(?!(axios|@santry|error-stack-parser|ua-parser-js))/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  target: 'node',
};
