module.exports = {
  presets: ['@babel/preset-typescript'],

  env: {
    build: {
      ignore: ['**/*.test.tsx', '**/*.test.ts', '__tests__'],
    },
  },
};
