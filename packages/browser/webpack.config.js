const path = require('path');
module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: { os: require.resolve('os-browserify/browser') },
  },
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules\/(?!(axios|@santry|error-stack-parser|ua-parser-js))/,
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, '.babelrc.js'),
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};
