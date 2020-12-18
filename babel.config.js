module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 11'],
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['inline-json-import', {}],
  ],

  env: {
    build: {
      ignore: ['**/*.test.tsx', '**/*.test.ts', '__tests__'],
    },
  },
  ignore: ['node_modules'],
};
