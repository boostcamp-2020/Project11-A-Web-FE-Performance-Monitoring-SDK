module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ie >= 9'],
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['inline-json-import', {}],
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
  ],

  env: {
    build: {
      ignore: ['**/*.test.tsx', '**/*.test.ts', '__tests__'],
    },
  },
  ignore: ['node_modules'],
};
