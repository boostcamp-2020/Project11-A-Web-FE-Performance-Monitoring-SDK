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
        exclude: /node_modules\/(?!(axios|@santry))/,
        loader: 'babel-loader',
        options: {
          configFile: '../../babel.config.js',
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
