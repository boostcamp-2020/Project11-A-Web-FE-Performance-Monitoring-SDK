module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['inline-json-import', {}],
    '@babel/plugin-transform-modules-commonjs',
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
  ],

  env: {
    build: {
      ignore: ['**/*.test.tsx', '**/*.test.ts', '__tests__'],
    },
  },
};
