module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['standard', 'prettier', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-restricted-globals': [
      'error',
      {
        name: 'arguments',
        message: 'Use rest parameters (...) instead of arguments object.',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: ['^_', '^__'],
      },
    ],
  },
};
