module.exports = {
    extends: ['eslint:recommended'],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        modules: true,
      },
    },
    env: {
      es6: true,
      browser: true,
    },
    rules: {},
    root: true,
  };
  