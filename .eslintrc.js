module.exports = {
  extends: ['eslint:recommended', 'plugin:jest/recommended'],
  plugins: ['jest'],
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
    'jest/globals': true,
  },
  rules: {},
  root: true,
};
